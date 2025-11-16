// Funcionalidad específica para la página de productos
$(document).ready(function() {
    cargarProductos();
    
    // Filtros de productos
    $('.filter-btn').click(function() {
        $('.filter-btn').removeClass('active bg-amber-500 text-white').addClass('bg-amber-200 text-amber-800');
        $(this).addClass('active bg-amber-500 text-white').removeClass('bg-amber-200 text-amber-800');
        
        const categoria = $(this).data('category');
        filtrarProductos(categoria);
    });
    
    // Efectos hover en productos
    $(document).on('mouseenter', '.card-hover', function() {
        $(this).addClass('transform scale-105 shadow-xl');
    }).on('mouseleave', '.card-hover', function() {
        $(this).removeClass('transform scale-105 shadow-xl');
    });
});

// Cargar productos desde JSON
function cargarProductos() {
    $.getJSON('data/productos.json', function(data) {
        mostrarProductos(data.productos);
    }).fail(function() {
        $('#productos-grid').html(`
            <div class="col-span-3 text-center py-12">
                <i class="fas fa-exclamation-triangle text-4xl text-amber-500 mb-4"></i>
                <h3 class="text-xl font-bold text-gray-700">Error al cargar los productos</h3>
                <p class="text-gray-600">Intenta recargar la página</p>
            </div>
        `);
    });
}

// Mostrar productos en el grid
function mostrarProductos(productos) {
    const grid = $('#productos-grid');
    grid.empty();
    
    if (productos.length === 0) {
        $('#no-products').show();
        return;
    }
    
    $('#no-products').hide();
    
    productos.forEach(productoData => {
        const producto = new Producto(
            productoData.id,
            productoData.nombre,
            productoData.precio,
            productoData.categoria,
            productoData.imagen,
            productoData.descripcion
        );
        
        grid.append(producto.crearCard());
    });
}

// Filtrar productos por categoría
function filtrarProductos(categoria) {
    $.getJSON('data/productos.json', function(data) {
        let productosFiltrados = data.productos;
        
        if (categoria !== 'todos') {
            productosFiltrados = data.productos.filter(producto => producto.categoria === categoria);
        }
        
        mostrarProductos(productosFiltrados);
        
        // Efecto de fade in
        $('#productos-grid .card-hover').hide().fadeIn(500);
    });
}