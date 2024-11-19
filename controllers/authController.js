// Import dependencies
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const multer = require('multer')

// User registration function
exports.registerUser = async (request, response) => {
    // Fetch data from the request body
    const {
        fullName,
        dob,
        phone,
        email,
        idNumber,
        password,
        address,
        city,
        postalCode,
        county,
        bikeModel,
        yearManufacture,
        engineNumber,
        chassisNumber,
        registrationNumber,
        coverageType,
        planDuration
    } = request.body;

    // Handle uploaded files
    const { idUpload, passportPhoto, motorbikeImages } = request.files;

    try {
        // Check if user exists
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length > 0) {
            return response.status(400).json({ message: 'User already exists!' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

         // Save uploaded files
         const idPath = `uploads/${Date.now()}_${idUpload[0].originalname}`;
         const passportPath = `uploads/${Date.now()}_${passportPhoto[0].originalname}`;
         const motorbikePaths = motorbikeImages.map((file, index) =>
             `uploads/${Date.now()}_${index}_${file.originalname}`
         );

        // Move files to destination
        fs.renameSync(idUpload[0].path, idPath);
        fs.renameSync(passportPhoto[0].path, passportPath);
        motorbikeImages.forEach((file, index) => {
            fs.renameSync(file.path, motorbikePaths[index]);
        });

        // Insert record into database
        await db.execute(
            `INSERT INTO users (
                fullName, dob, phone, email, idNumber, password, address, city, postalCode, county,
                bikeModel, yearManufacture, engineNumber, chassisNumber, registrationNumber,
                coverageType, planDuration, idUpload, passportPhoto, motorbikeImages
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                fullName,
                dob,
                phone,
                email,
                idNumber,
                hashedPassword,
                address,
                city,
                postalCode,
                county,
                bikeModel,
                yearManufacture,
                engineNumber,
                chassisNumber,
                registrationNumber,
                coverageType,
                planDuration,
                idPath,
                passportPath,
                motorbikePaths.join(',')
            ]
        );

         // Insert personal images
         await db.execute('INSERT INTO user_images (user_id, image_type, image_path) VALUES (?, ?, ?)', [userId, 'personal', idPath]);
         await db.execute('INSERT INTO user_images (user_id, image_type, image_path) VALUES (?, ?, ?)', [userId, 'personal', passportPath]);
 
         // Insert motorbike images
         for (let i = 0; i < motorbikePaths.length; i++) {
             await db.execute('INSERT INTO user_images (user_id, image_type, image_path) VALUES (?, ?, ?)', [userId, 'motorbike', motorbikePaths[i]]);
         }

        response.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error(error); // Log the error to the console
        response.status(500).json({ message: 'An error occurred!', error });
    }
};

// User login function
exports.loginUser = async (request, response) => {
    const { email, password } = request.body;
    try {
        // Check if user exists
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
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
            email: user.email
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
