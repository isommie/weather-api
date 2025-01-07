document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([51.505, -0.09], 13);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);
  
    map.on('click', async (e) => {
      const { lat, lng } = e.latlng;
  
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Please sign in first.');
          window.location.href = '/views/signin.html';
          return;
        }
  
        // Convert lat/lng to a location name (e.g., city name)
        const location = await getLocationFromCoordinates(lat, lng);
        if (!location) {
          alert('Unable to retrieve location.');
          return;
        }
  
        const response = await fetch(`http://127.0.0.1:3000/api/weather?location=${location}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await response.json();
        if (response.ok) {
          document.getElementById('weatherData').innerText = `Temperature: ${data.main.temp}°C, Condition: ${data.weather[0].description}`;
        } else {
          alert(data.error || 'Failed to fetch weather data.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
    });
  
    // Function to get location name from coordinates
    async function getLocationFromCoordinates(lat, lng) {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
      
      try {
        const response = await fetch(url);
        const data = await response.json();
        return data.address.city || data.address.town || data.address.village || data.address.country;
      } catch (error) {
        console.error('Error getting location from coordinates:', error);
        return null;
      }
    }
  });
  