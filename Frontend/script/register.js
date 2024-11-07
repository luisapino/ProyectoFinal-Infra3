// register.js
$(document).ready(function() {
    $('#registerForm').on('submit', function(e) {
        e.preventDefault();
        
        const userData = {
            fullName: $('#fullName').val(),
            email: $('#email').val(),
            document: $('#document').val(),
            password: $('#password').val()
        };

        $.ajax({
            url: 'http://localhost:3000/auth/register',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(userData),
            success: function() {
                alert('Registro exitoso');
                window.location.href = 'index.html';
            },
            error: function(xhr) {
                alert('Error en el registro: ' + xhr.responseJSON.message);
            }
        });
    });
});