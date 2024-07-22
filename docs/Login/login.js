document.addEventListener('DOMContentLoaded', () => {
    const adminPassword = 'Dante123$'; // Set the correct admin password
    const loginButton = document.getElementById('login-button');
    const passwordInput = document.getElementById('admin-password');

    loginButton.addEventListener('click', () => {
        if (passwordInput.value === adminPassword) {
            window.location.href = 'index.html'; // Redirect to the admin main page
        } else {
            alert('Incorrect password. Please try again.');
        }
    });
});
