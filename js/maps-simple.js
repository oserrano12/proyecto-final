function initSimpleMap() {
    $('#map').html(`
        <div class="h-full flex flex-col items-center justify-center bg-amber-100 rounded-lg p-4">
            <i class="fas fa-map-marker-alt text-4xl text-amber-600 mb-4"></i>
            <h3 class="font-bold text-amber-900 text-lg mb-2">Nuestra Ubicación</h3>
            <p class="text-amber-800 text-center mb-4">
                Calle 45 # 25-35<br>
                Bucaramanga, Santander<br>
                Colombia
            </p>
            <div class="flex gap-4">
                <button onclick="openGoogleMaps()" class="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors flex items-center">
                    <i class="fab fa-google mr-2"></i>Google Maps
                </button>
                <button onclick="openWaze()" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center">
                    <i class="fab fa-waze mr-2"></i>Waze
                </button>
            </div>
        </div>
    `);
}

function openGoogleMaps() {
    window.open('https://maps.google.com/?q=Bucaramanga,Santander', '_blank');
}

function openWaze() {
    window.open('https://waze.com/ul?q=Bucaramanga,Santander', '_blank');
}

$(document).ready(function() {
    initSimpleMap();
});