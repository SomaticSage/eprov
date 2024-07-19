document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const goToSiteButton = document.getElementById('go-to-site-button');

    function checkInputs() {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (email && password) {
            goToSiteButton.classList.add('enabled');
        } else {
            goToSiteButton.classList.remove('enabled');
        }
    }

    emailInput.addEventListener('input', () => {
        const email = emailInput.value.trim();
        const storedPassword = localStorage.getItem(email);

        if (storedPassword) {
            passwordInput.placeholder = 'Enter your password';
        } else {
            passwordInput.placeholder = 'Create a password';
        }
        checkInputs();
    });

    passwordInput.addEventListener('input', checkInputs);

    goToSiteButton.addEventListener('click', (event) => {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const storedPassword = localStorage.getItem(email);

        if (storedPassword) {
            if (storedPassword !== password) {
                alert('Incorrect password. Please try again.');
                event.preventDefault();
            }
        } else {
            localStorage.setItem(email, password);
        }
    });
});

// how to read all local storage
// for (let i = 0; i < localStorage.length; i++) {
//     let key = localStorage.key(i);
//     let value = localStorage.getItem(key);
//     console.log(`${key}: ${value}`);
// }

//How to wipe all passwords
// Open the browser console and execute this script
// for (let i = 0; i < localStorage.length; i++) {
//     let key = localStorage.key(i);
//     // Assuming the keys are email addresses (simple validation check for "@" symbol)
//     if (key.includes("@")) {
//         localStorage.removeItem(key);
//         console.log(`Removed: ${key}`);
//         // Adjust the index to account for the removed item
//         i--;
//     }
// }
// console.log('All stored passwords have been removed.');

