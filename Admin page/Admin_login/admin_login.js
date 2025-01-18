function validateForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    if (username === "admin" && password === "password") {
        alert('Login successful!');
        window.location.href = 'view_year.html';
        return false;
    } 
    else {
        errorMessage.textContent = 'Invalid username or password';
        return false;
    }
}            