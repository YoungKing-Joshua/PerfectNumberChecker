document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === '' || password === '') {
        alert('Please fill in all fields.');
        return;
    }

    // Here you would typically send the data to your server for authentication
    // For now, we will just simulate a successful login
    alert('Login successful!');
    window.location.href = 'manage-shipments.html'; // Redirect to the manage shipments page
});
