// Funcionalidad específica para la página de contacto
$(document).ready(function() {
    // Validación del formulario
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        
        if (validarFormulario()) {
            enviarFormulario();
        }
    });
    
    // Validación en tiempo real
    $('#nombre, #email, #asunto, #mensaje').on('blur', function() {
        validarCampo($(this));
    });
});

// Validar campo individual
function validarCampo(campo) {
    const valor = campo.val().trim();
    const tipo = campo.attr('id');
    const errorElement = $(`#${tipo}-error`);
    
    errorElement.empty();
    
    switch(tipo) {
        case 'nombre':
            if (valor.length < 2) {
                errorElement.text('El nombre debe tener al menos 2 caracteres');
                campo.addClass('border-red-500');
                return false;
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(valor)) {
                errorElement.text('Ingresa un email válido');
                campo.addClass('border-red-500');
                return false;
            }
            break;
            
        case 'asunto':
            if (valor === '') {
                errorElement.text('Selecciona un asunto');
                campo.addClass('border-red-500');
                return false;
            }
            break;
            
        case 'mensaje':
            if (valor.length < 10) {
                errorElement.text('El mensaje debe tener al menos 10 caracteres');
                campo.addClass('border-red-500');
                return false;
            }
            break;
    }
    
    campo.removeClass('border-red-500').addClass('border-green-500');
    return true;
}

// Validar formulario completo
function validarFormulario() {
    let esValido = true;
    
    $('#nombre, #email, #asunto, #mensaje').each(function() {
        if (!validarCampo($(this))) {
            esValido = false;
        }
    });
    
    return esValido;
}

// Enviar formulario
function enviarFormulario() {
    const formData = {
        nombre: $('#nombre').val().trim(),
        email: $('#email').val().trim(),
        telefono: $('#telefono').val().trim(),
        asunto: $('#asunto').val(),
        mensaje: $('#mensaje').val().trim(),
        newsletter: $('#newsletter').is(':checked'),
        fecha: new Date().toISOString()
    };
    
    // Mostrar loading
    const submitBtn = $('#contact-form button[type="submit"]');
    const originalText = submitBtn.html();
    submitBtn.html('<i class="fas fa-spinner fa-spin mr-2"></i>Enviando...').prop('disabled', true);
    
    // Simular envío (en producción sería una petición AJAX real)
    setTimeout(() => {
        // Guardar en localStorage (simulación de base de datos)
        const contactos = JSON.parse(localStorage.getItem('contactos') || '[]');
        contactos.push(formData);
        localStorage.setItem('contactos', JSON.stringify(contactos));
        
        // Mostrar mensaje de éxito
        $('#form-message').html(`
            <div class="success-message animate-fade-in-up">
                <i class="fas fa-check-circle mr-2"></i>
                ¡Mensaje enviado correctamente! Te contactaremos pronto.
            </div>
        `);
        
        // Resetear formulario
        $('#contact-form')[0].reset();
        $('#contact-form .form-input').removeClass('border-green-500 border-red-500');
        
        // Restaurar botón
        submitBtn.html(originalText).prop('disabled', false);
        
        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
            $('#form-message').empty();
        }, 5000);
        
    }, 2000);
}

// Validación de archivo
$('#archivo').on('change', function() {
    const archivo = this.files[0];
    const maxSize = 5 * 1024 * 1024; // 5MB
    const tiposPermitidos = ['image/jpeg', 'image/png', 'application/pdf'];
    
    if (archivo) {
        if (archivo.size > maxSize) {
            alert('El archivo es demasiado grande. Máximo 5MB permitido.');
            $(this).val('');
        } else if (!tiposPermitidos.includes(archivo.type)) {
            alert('Tipo de archivo no permitido. Solo JPG, PNG y PDF.');
            $(this).val('');
        }
    }
});