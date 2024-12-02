// src/SensorData.js
import React, { useEffect, useState } from 'react';
import mqtt from 'mqtt';
import './Dashboard.css';
import WaterRecommendation from './WaterRecommendation'; // Import the new component

const SensorData = () => {
  const [temperature, setTemperature] = useState('Loading...');
  const [humidity, setHumidity] = useState('Loading...');
  const [soilMoisture, setSoilMoisture] = useState('Loading...');

  useEffect(() => {
    const client = mqtt.connect('ws://broker.hivemq.com:8000/mqtt');

    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      client.subscribe('home/temperature');
      client.subscribe('home/humidity');
      client.subscribe('home/soil_moisture');
    });

    client.on('message', (topic, message) => {
      const value = message.toString();
      if (topic === 'home/temperature') {
        setTemperature(parseFloat(value)); // Convert to float for comparison
      } else if (topic === 'home/humidity') {
        setHumidity(parseFloat(value)); // Convert to float for comparison
      } else if (topic === 'home/soil_moisture') {
        setSoilMoisture(value);
      }
    });

    return () => {
      client.end();
    };
  }, []);

  return (
    <div className="sensor-data">
      <h1>IOT Based Dashboard</h1>
      <p>Temperature: <span>{temperature}</span> °C</p>
      <p>Humidity: <span>{humidity}</span> %</p>
      <p>Soil Moisture: <span>{soilMoisture}</span></p>
      <WaterRecommendation temperature={temperature} humidity={humidity} /> {/* Pass values to the new component */}
    </div>
  );
};

export default SensorData;