// Import dependencies
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const multer = require('multer')

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory for uploads
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_')); // Unique filename
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Invalid file type! Only JPG, PNG allowed.'));
        }
        cb(null, true);
    }
});

// User registration function
exports.registerUser = (req, res) => {
    
    upload.fields([
        { name: 'idUpload', maxCount: 1 },
        { name: 'passportPhoto', maxCount: 1 },
        { name: 'motorbikeImages', maxCount: 3 }
    ])(req, res, async (err) => {
        if (err) {
            console.error('File upload error:', err);
            return res.status(400).json({ message: err.message });
        }

        const {
            fullName, dob, phone, email, idNumber, password, address, city,
            postalCode, county, bikeModel, yearManufacture, engineNumber,
            chassisNumber, registrationNumber, coverageType, planDuration
        } = req.body;

        // Validate required fields
        if (!fullName || !idNumber || !password) {
            return res.status(400).json({ message: 'Missing required fields!' });
        }

        // Get uploaded file paths
        const idUpload = req.files.idUpload ? req.files.idUpload[0].path : null;
        const passportPhoto = req.files.passportPhoto ? req.files.passportPhoto[0].path : null;
        const motorbikeImages = req.files.motorbikeImages
            ? req.files.motorbikeImages.map((file) => file.path)
            : [];

        try {
            // Check if user exists
            const [rows] = await db.execute('SELECT * FROM users WHERE idNumber = ?', [idNumber]);
            if (rows.length > 0) {
                return res.status(400).json({ message: 'User already exists!' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert user into database
            const [userResult] = await db.execute(
                `INSERT INTO users (full_name, dob, phone, email, idNumber, password) VALUES (?, ?, ?, ?, ?)`,
                [fullName, dob, phone, email, idNumber, hashedPassword]
            );
            const userId = userResult.insertId;
            
            // Insert personal information into database
            await db.execute(
                `INSERT INTO personalInformation (user_id, id_number, id_upload, passport_photo) VALUES (?, ?, ?, ?)`,
                [userId, idNumber, idUpload, passportPhoto]
            );

            // Insert address information into database
            await db.execute(
                `INSERT INTO addressInformation (user_id, address, city, postal_code, county) VALUES (?, ?, ?, ?, ?)`,
                [userId, address, city, postalCode, county] // Use `county` as `country` in your code
            );

            // Insert motorbike information into database
            await db.execute(
                `INSERT INTO motorbikeDetails (user_id, bike_model, year_manufacture, engine_number, chassis_number, registration_number, motorbike_images) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [userId, bikeModel, yearManufacture, engineNumber, chassisNumber, registrationNumber, motorbikeImages.join(',')]
            );

            // Insert insurance plan details
            await db.execute(
                `INSERT INTO insurancePlans (user_id, coverage_type, plan_duration) VALUES (?, ?, ?)`,
                [userId, coverageType, planDuration]
            );
            

            res.status(201).json({ message: 'User registered successfully!' });
        } catch (error) {
            console.error('Error during registration:', error);
            res.status(500).json({ message: 'Server error!', error });
        }
    });
};

// User login function
exports.loginUser = async (request, response) => {
    const { idNumber, password } = request.body;
    try {
        // Check if user exists
        const [rows] = await db.execute('SELECT * FROM users WHERE idNumber = ?', [idNumber]);
        if (rows.length === 0) {
            return response.status(400).json({ message: 'User not found! Please register.' });
        }
        const user = rows[0];

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return response.status(400).json({ message: 'Invalid credentials!' });
        }
        response.status(200).json({
            message: 'Login successful!',
            name: user.fullName,
            email: user.idNumber
        });
    } catch (error) {
        response.status(500).json({ message: 'An error occurred!', error });
    }
};

// User logout function
exports.logoutUser = (request, response) => {
    // Implement logout logic, e.g., destroying session or token
    response.status(200).json({ message: 'Logout successful!' });
};
