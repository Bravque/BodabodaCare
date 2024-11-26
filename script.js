document.addEventListener('DOMContentLoaded', function () {
    // Handle user registration form submission
    const registerForm = document.getElementById('frm-register');
    if (registerForm) {
        registerForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Fetch form data
            const fullName = document.getElementById('fullName').value;
            const dob = document.getElementById('dob').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const idNumber = document.getElementById('idNumber').value;
            const password = document.getElementById('password').value;
            const address = document.getElementById('address').value;
            const city = document.getElementById('city').value;
            const postalCode = document.getElementById('postalCode').value;
            const county = document.getElementById('county').value;
            const bikeModel = document.getElementById('bikeModel').value;
            const yearManufacture = document.getElementById('yearManufacture').value;
            const engineNumber = document.getElementById('engineNumber').value;
            const chassisNumber = document.getElementById('chassisNumber').value;
            const registrationNumber = document.getElementById('registrationNumber').value;
            const coverageType = document.getElementById('coverageType').value;
            const planDuration = document.getElementById('planDuration').value;

            // Get files from file inputs
            const idUpload = document.getElementById('idUpload').files[0];
            const passportPhoto = document.getElementById('passportPhoto').files[0];
            const motorbikeImages = document.getElementById('motorbikeImages').files;

            // Create a FormData object to handle file uploads
            const formData = new FormData();
            formData.append('fullName', fullName);
            formData.append('dob', dob);
            formData.append('phone', phone);
            formData.append('email', email);
            formData.append('idNumber', idNumber);
            formData.append('password', password);
            formData.append('address', address);
            formData.append('city', city);
            formData.append('postalCode', postalCode);
            formData.append('county', county);
            formData.append('bikeModel', bikeModel);
            formData.append('yearManufacture', yearManufacture);
            formData.append('engineNumber', engineNumber);
            formData.append('chassisNumber', chassisNumber);
            formData.append('registrationNumber', registrationNumber);
            formData.append('coverageType', coverageType);
            formData.append('planDuration', planDuration);
            formData.append('idUpload', idUpload);
            formData.append('passportPhoto', passportPhoto);

            // Append motorbike images (multiple files)
            Array.from(motorbikeImages).forEach(file => {
                formData.append('motorbikeImages', file);
            });

            try {
                const response = await fetch('/auth/register', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();

                if (response.ok) {
                    alert(data.message); // Show success message
                    // Redirect to login.html
                    window.location.href = 'login.html';
                } else {
                    alert(`Error: ${data.message}`); // Show error message
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }

    // Handle user login form submission
    const loginForm = document.getElementById('frm-login');
    if (loginForm) {
        loginForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Send the login request
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.message === 'Login successful!') {
                alert(`${data.message} Welcome ${data.name}, email: ${data.email}`);
            } else {
                alert(data.message); // Show error message on failed login
            }
        });
    }
});
