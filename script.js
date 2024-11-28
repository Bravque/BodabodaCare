document.addEventListener('DOMContentLoaded', function () {
   // Handle user registration form submission
    const registerForm = document.getElementById('frm-register');

    if (registerForm) {
        registerForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Collect form data
            const formData = new FormData(registerForm);

            // Get files separately (if necessary)
            const idUpload = document.getElementById('idUpload').files[0];
            const passportPhoto = document.getElementById('passportPhoto').files[0];
            const motorbikeImages = document.getElementById('motorbikeImages').files;

            if (idUpload) formData.append('idUpload', idUpload);
            if (passportPhoto) formData.append('passportPhoto', passportPhoto);

            // Append multiple motorbike images
            Array.from(motorbikeImages).forEach(file => {
                formData.append('motorbikeImages', file);
            });

            try {
                // Send data to the server
                const response = await fetch('/auth/register', {
                    method: 'POST',
                    body: formData,
                });

                // Parse response
                const data = await response.json();

                if (response.ok) {
                    alert(data.message || "Registration successful!");
                    // Use the redirect URL from the server
                    window.location.href = data.redirect || '/login.html';
                }else {
                    // Handle server-side validation errors
                    alert(data.message || 'Registration failed. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred during registration. Please try again later.');
            }
        });
    }


    // Handle user login form submission
    const loginForm = document.getElementById('frm-login');
    if (loginForm) {
        loginForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const idNumber = document.getElementById('idNumber').value;
            const password = document.getElementById('password').value;

            // Send the login request
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idNumber, password }),
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
