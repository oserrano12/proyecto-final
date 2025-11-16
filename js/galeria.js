// Funcionalidad específica para la galería
$(document).ready(function() {
    // Filtros de galería
    $('.gallery-filter').click(function() {
        $('.gallery-filter').removeClass('active bg-amber-500 text-white').addClass('bg-amber-200 text-amber-800');
        $(this).addClass('active bg-amber-500 text-white').removeClass('bg-amber-200 text-amber-800');
        
        const filter = $(this).data('filter');
        filtrarGaleria(filter);
    });
    
    // Lightbox para imágenes
    $('.view-image').click(function() {
        const imageSrc = $(this).closest('.gallery-item').find('img').attr('src');
        const imageAlt = $(this).closest('.gallery-item').find('img').attr('alt');
        
        $('#lightbox-image').attr('src', imageSrc).attr('alt', imageAlt);
        $('#lightbox').fadeIn(300);
    });
    
    // Cerrar lightbox
    $('#close-lightbox').click(function() {
        $('#lightbox').fadeOut(300);
    });
    
    // Cerrar lightbox al hacer click fuera
    $('#lightbox').click(function(e) {
        if (e.target === this) {
            $(this).fadeOut(300);
        }
    });
    
    // Efectos hover en galería
    $('.gallery-item').hover(
        function() {
            $(this).find('.view-image').addClass('opacity-100 translate-y-0').removeClass('opacity-0 translate-y-4');
        },
        function() {
            $(this).find('.view-image').removeClass('opacity-100 translate-y-0').addClass('opacity-0 translate-y-4');
        }
    );
    
    // Control de audio
    $('audio').each(function() {
        const audio = $(this)[0];
        
        $(this).on('play', function() {
            // Pausar otros audios cuando uno se reproduce
            $('audio').not(this).each(function() {
                this.pause();
                this.currentTime = 0;
            });
        });
    });
});

// Filtrar galería
function filtrarGaleria(filter) {
    if (filter === 'todos') {
        $('.gallery-item').fadeIn(500);
    } else {
        $('.gallery-item').hide();
        $(`.gallery-item[data-type="${filter}"]`).fadeIn(500);
    }
    
    // Efecto de aparición escalonada
    $('.gallery-item:visible').each(function(index) {
        $(this).delay(100 * index).animate({opacity: 1}, 300);
    });
}

// Pseudoelementos decorativos para galería
function agregarEfectosPseudoelementos() {
    // Agregar efecto ::before a las cards de imágenes
    $('.imagen-item').each(function() {
        if (!$(this).find('.decorative-border').length) {
            $(this).prepend('<div class="decorative-border"></div>');
        }
    });
}

// Inicializar efectos al cargar
setTimeout(agregarEfectosPseudoelementos, 1000);