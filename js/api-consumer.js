// API Real del Clima - OpenWeatherMap
class WeatherAPI {
    constructor() {
        this.apiKey = 'tu_api_key_aqui';
        this.city = 'Bucaramanga,CO';
        this.baseURL = 'https://api.openweathermap.org/data/2.5';
    }

    async getWeather() {
        try {
            if (this.apiKey === 'tu_api_key_aqui') {
                return this.getSampleData();
            }

            const response = await fetch(
                `${this.baseURL}/weather?q=${this.city}&appid=${this.apiKey}&units=metric&lang=es`
            );
            
            if (!response.ok) {
                throw new Error('Error al obtener datos del clima');
            }
            
            const data = await response.json();
            return this.formatWeatherData(data);
            
        } catch (error) {
            console.error('Error:', error);
            return this.getSampleData();
        }
    }

    formatWeatherData(data) {
        return {
            temperature: Math.round(data.main.temp),
            description: data.weather[0].description,
            humidity: data.main.humidity + '%',
            icon: this.getWeatherIcon(data.weather[0].main),
            city: data.name
        };
    }

    getWeatherIcon(weatherMain) {
        const icons = {
            'Clear': 'fa-sun',
            'Clouds': 'fa-cloud',
            'Rain': 'fa-cloud-rain',
            'Drizzle': 'fa-cloud-drizzle',
            'Thunderstorm': 'fa-bolt',
            'Snow': 'fa-snowflake',
            'Mist': 'fa-smog',
            'Smoke': 'fa-smog',
            'Haze': 'fa-smog',
            'Dust': 'fa-smog',
            'Fog': 'fa-smog',
            'Sand': 'fa-smog',
            'Ash': 'fa-smog',
            'Squall': 'fa-wind',
            'Tornado': 'fa-tornado'
        };
        return icons[weatherMain] || 'fa-cloud';
    }

    getSampleData() {
        const sampleData = [
            {
                temperature: 24,
                description: 'Parcialmente nublado',
                humidity: '65%',
                icon: 'fa-cloud-sun',
                city: 'Bucaramanga'
            },
            {
                temperature: 26,
                description: 'Soleado',
                humidity: '60%',
                icon: 'fa-sun',
                city: 'Bucaramanga'
            },
            {
                temperature: 22,
                description: 'Lluvias ligeras',
                humidity: '75%',
                icon: 'fa-cloud-rain',
                city: 'Bucaramanga'
            }
        ];
        return sampleData[Math.floor(Math.random() * sampleData.length)];
    }
}

async function loadRealWeatherData() {
    const weatherAPI = new WeatherAPI();
    const weatherData = await weatherAPI.getWeather();
    
    $('#weather-data').html(`
        <div class="flex items-center justify-center space-x-4">
            <i class="fas ${weatherData.icon} text-4xl text-amber-600"></i>
            <div class="text-left">
                <p class="text-2xl font-bold text-amber-900">${weatherData.temperature}°C</p>
                <p class="text-gray-600 capitalize">${weatherData.description}</p>
                <p class="text-sm text-gray-500">Humedad: ${weatherData.humidity}</p>
                <p class="text-xs text-gray-400">${weatherData.city}</p>
            </div>
        </div>
    `);
}

$(document).ready(function() {
    loadRealWeatherData();
});