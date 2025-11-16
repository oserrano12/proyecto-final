// Funcionalidad principal con jQuery
$(document).ready(function() {
    // Menú móvil
    $('#mobile-menu-button').click(function() {
        $('#mobile-menu').slideToggle(300);
    });

    // Smooth scroll para enlaces internos
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
    });

    // Efecto parallax en el hero
    $(window).scroll(function() {
        const scrolled = $(window).scrollTop();
        $('.hero-section video').css('transform', `translateY(${scrolled * 0.5}px)`);
        
        // Navbar con backdrop al hacer scroll
        if (scrolled > 100) {
            $('nav').addClass('bg-amber-900/95');
        } else {
            $('nav').removeClass('bg-amber-900/95');
        }
    });

    // Animación de elementos al hacer scroll
    function animateOnScroll() {
        $('.custom-feature-card, .custom-weather-card').each(function() {
            const elementTop = $(this).offset().top;
            const windowBottom = $(window).scrollTop() + $(window).height();
            
            if (elementTop < windowBottom - 100) {
                $(this).addClass('animate-fade-in-up');
            }
        });
    }

    // Ejecutar al cargar y al hacer scroll
    animateOnScroll();
    $(window).scroll(animateOnScroll);

    // Cargar datos del clima
    loadWeatherData();
});

// Función para cargar datos del clima
function loadWeatherData() {
    // Simulación de API - En producción usarías OpenWeatherMap
    const weatherData = {
        temperature: '24°C',
        description: 'Parcialmente nublado',
        humidity: '65%',
        icon: 'fa-cloud-sun'
    };
    
    setTimeout(() => {
        $('#weather-data').html(`
            <div class="flex items-center justify-center space-x-4">
                <i class="${weatherData.icon} text-4xl text-amber-600"></i>
                <div class="text-left">
                    <p class="text-2xl font-bold text-amber-900">${weatherData.temperature}</p>
                    <p class="text-gray-600">${weatherData.description}</p>
                    <p class="text-sm text-gray-500">Humedad: ${weatherData.humidity}</p>
                </div>
            </div>
        `);
    }, 1500);
}

// Clase Producto (POO)
class Producto {
    constructor(id, nombre, precio, categoria, imagen, descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.imagen = imagen;
        this.descripcion = descripcion;
    }
    
    mostrarInfo() {
        return `${this.nombre} - $${this.precio}`;
    }
    
    crearCard() {
        return `
            <div class="bg-white rounded-xl shadow-md overflow-hidden card-hover" data-category="${this.categoria}">
                <img src="${this.imagen}" alt="${this.nombre}" class="w-full h-48 object-cover">
                <div class="p-6">
                    <h3 class="font-bold text-xl text-amber-900 mb-2">${this.nombre}</h3>
                    <p class="text-gray-600 mb-4">${this.descripcion}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-2xl font-bold text-amber-600">$${this.precio}</span>
                        <button class="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors agregar-carrito" data-id="${this.id}">
                            <i class="fas fa-shopping-cart mr-2"></i>
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
}