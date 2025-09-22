document.addEventListener('DOMContentLoaded', () => {
    const submit = document.getElementById('login-button')

    submit.addEventListener('click', handleLogin)


    function handleLogin(event) {
        event.preventDefault()

        let users = JSON.parse(localStorage.getItem('users')) || [];

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

        if (!user) {
            alert(`Invalid email or password. Please signup`)
            return;
        }

        const token = Date.now()
        localStorage.setItem('token', token);
        localStorage.setItem('loggedInUser', JSON.stringify(user))

        window.location.href = '/shop/shop.html'
    }
})