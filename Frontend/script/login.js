
$(document).ready(function() {
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        
        const email = $('#email').val();
        const password = $('#password').val();

        $.ajax({
            url: 'http://localhost:3000/auth/login',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email, password }),
            success: function(response) {
                localStorage.setItem('token', response.token);
                window.location.href = 'catalog.html';
            },
            error: function(xhr) {
                alert('Error al iniciar sesión: ' + xhr.responseJSON.message);
            }
        });
    });
});