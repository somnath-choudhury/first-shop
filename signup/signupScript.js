document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('signup-button');
    submitBtn.addEventListener('click', handleSignup);

    let users = JSON.parse(localStorage.getItem("users")) || [];

    function handleSignup(event) {
        event.preventDefault();

        const firstName = document.getElementById('first-name');
        const lastName = document.getElementById('last-name');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirm-password');

        const firstNameValue = firstName.value.trim();
        const lastNameValue = lastName.value.trim();
        const emailValue = email.value.trim();
        const passwordValue = password.value;
        const confirmPasswordValue = confirmPassword.value;

        if (!firstNameValue || !lastNameValue || !emailValue || !passwordValue || !confirmPasswordValue) {
            alert(`Please enter all details`);
            return;
        }

        if (passwordValue.length < 8) {
            alert(`Password length should be at least 8 characters`);
            return;
        }

        if (passwordValue !== confirmPasswordValue) {
            alert('Password and confirm password do not match');
            return;
        }

        const emailExists = users.some(user => user.email.toLowerCase() === emailValue.toLowerCase());
        if (emailExists) {
            alert(`A user with the same email already exists! Please login.`);
            return;
        }

        const userObj = {
            first: firstNameValue,
            last: lastNameValue,
            email: emailValue,
            password: passwordValue
        };

        users.push(userObj);
        localStorage.setItem('users', JSON.stringify(users));

        alert(`SignUp successful. Please login.`);
        console.log('Users:', users);

        firstName.value = '';
        lastName.value = '';
        email.value = '';
        password.value = '';
        confirmPassword.value = '';
    }
});
