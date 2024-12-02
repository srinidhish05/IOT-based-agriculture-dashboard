// src/WaterRecommendation.js
import React from 'react';

const WaterRecommendation = ({ temperature, humidity }) => {
  // Define thresholds for temperature and humidity
  const temperatureThreshold = 25; // Example threshold in °C
  const humidityThreshold = 100; // Example threshold in %

  // Logic to determine whether to water crops
  const shouldWater = temperature > temperatureThreshold && humidity < humidityThreshold;

  return (
    <div className="recommendation">
      <h2>Water Recommendation</h2>
      {shouldWater ? (
        <p style={{ color: 'red', fontWeight: 'bold' }}>Recommendation: <span>Pour water for crops!</span></p>
      ) : (
        <p style={{ color: 'green', fontWeight: 'bold' }}>Recommendation: <span>No need to water crops.</span></p>
      )}
    </div>
  );
};

export default WaterRecommendation;