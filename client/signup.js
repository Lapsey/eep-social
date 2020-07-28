const signupForm = document.querySelector('#signupForm');
const username = document.querySelector('#Username');
const password = document.querySelector('#Password');
const confirmPassword = document.querySelector('#ConfirmPassword');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputs = {
        username: username.value,
        password: password.value,
        confirmPassword: confirmPassword.value
    };

    alert(inputs);
});