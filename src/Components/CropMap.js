import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const CropMap = () => {
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [position, setPosition] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        fetchWeatherData(lat, lng);
      },
    });
    return null;
  };

  const fetchWeatherData = async (lat, lng) => {
    const API_KEY = '98af18ef818018c9621228075b90349c'; // Your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;

    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
      determineCropRecommendation(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const determineCropRecommendation = (weatherData) => {
    if (weatherData && weatherData.main) {
      const temperature = weatherData.main.temp;
      const humidity = weatherData.main.humidity;
      
      if (temperature > 25 && humidity < 60) {
        setSelectedCrop('Corn');
      } else if (temperature < 25 && humidity > 60) {
        setSelectedCrop('Wheat');
      } else {
        setSelectedCrop('Rice');
      }
    }
  };

  // Add the updated return statement here
  return (
    <div>
      <MapContainer center={[20, 80]} zoom={5} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapClickHandler />
        {position && (
          <Marker position={position}>
            <Popup>
              {selectedCrop ? (
                <span>Recommended Crop: <strong>{selectedCrop}</strong></span>
              ) : (
                <span>Click on the map to find a crop recommendation!</span>
              )}
              {weatherData && (
                <div>
                  <p>Temperature: {weatherData.main.temp} °C</p>
                  <p>Humidity: {weatherData.main.humidity} %</p>
                  
<MapContainer 
  center={[20, 80]} 
  zoom={5} 
  style={{ 
    height: 'calc(100vh - 120px)', // Adjust based on your needs
    width: '100%',
    margin: '20px 0'
  }}
>
  {/* ... rest of your map code ... */}
</MapContainer>
                </div>
              )}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default CropMap;