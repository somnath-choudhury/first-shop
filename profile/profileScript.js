const token = localStorage.getItem('token')
let user = JSON.parse(localStorage.getItem('loggedInUser'))
let users = JSON.parse(localStorage.getItem('users')) || []

if (!token || !user) {
  alert(`Unauthorized access. Please login`)
  window.location.href = '/f3-project/index.html'
}

const firstNameInput = document.querySelector('#profile-name input:nth-of-type(1)');
const lastNameInput = document.querySelector('#profile-name input:nth-of-type(2)');
const saveInfoBtn = document.getElementById("change-name-btn");

const oldPasswordInput = document.querySelector('#edit-password input:nth-of-type(1)');
const newPasswordInput = document.querySelector('#edit-password input:nth-of-type(2)');
const confirmPasswordInput = document.querySelector('#edit-password input:nth-of-type(3)');
const changePasswordBtn = document.getElementById("change-password-btn");

const logoutBtn = document.getElementById("logout-btn");

firstNameInput.value = user.first;
lastNameInput.value = user.last;

function updateUsersArray (updatedUser) {
    users = users.map(u => u.email === user.email ? {...u, ...updatedUser} : u);

    localStorage.setItem('users', JSON.stringify(users))
}

saveInfoBtn.addEventListener('click', () => {
    const newFirst = firstNameInput.value.trim()
    const newLast = lastNameInput.value.trim();

    if (!newFirst || !newLast) {
        alert(`First and last name cannot be empty`)
        return;
    }

    user.first = newFirst
    user.last = newLast

    localStorage.setItem('loggedInUser', JSON.stringify(user));

    updateUsersArray({first: newFirst, last : newLast})

    alert(`Name changed successfully`)
});

changePasswordBtn.addEventListener('click', () => {
    const oldPass = oldPasswordInput.value;
    const newPass = newPasswordInput.value;
    const confirmPass = confirmPasswordInput.value;

    if (!oldPass || !newPass || !confirmPass) {
        alert("Please fill all password fields!");
        return;
    }

    if (oldPass !== user.password) {
        alert(`Old password is incorrect`)
        return;
    }

    if (newPass !== confirmPass) {
        alert(`New password and confirmation do not match`)
        return;
    }

    user.password = newPass;
    localStorage.setItem('loggedInUser', JSON.stringify(user));

    updateUsersArray({password : newPass})

    alert(`Password updated successfully`)
    oldPasswordInput.value = newPasswordInput.value = confirmPasswordInput.value = "";
})

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token')
    localStorage.removeItem('loggedInUser')
    localStorage.removeItem('cart')
    alert(`Logged out successfully!`)
    window.location.href = "/f3-project/index.html"
});