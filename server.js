const express = require('express');
const bodyParser = require('body-parser');
const mqtt = require('mqtt');
const app = express();
const port = 5000;

app.use(bodyParser.json());

// MQTT client setup
const mqttClient = mqtt.connect('broker.hivemq.com'); // Use your broker details

// Variable to store sensor data
let sensorData = {
  temperature: '',
  humidity: '',
  soilMoisture: '',
};


mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
  mqttClient.subscribe('home/temperature');
  mqttClient.subscribe('home/humidity');
  mqttClient.subscribe('home/soil_moisture');
});

// Handle incoming MQTT messages and store the data
mqttClient.on('message', (topic, message) => {
  const value = message.toString();
  if (topic === 'home/temperature') {
    sensorData.temperature = value;
  } else if (topic === 'home/humidity') {
    sensorData.humidity = value;
  } else if (topic === 'home/soil_moisture') {
    sensorData.soilMoisture = value;
  }
  console.log("Data being sent to frontend:",sensorData);
});

// Endpoint for React app to get sensor data
app.get('/api/sensors', (req, res) => {
  res.json(sensorData);
});

// Start the server
app.listen(port, () => {
  console.log('Server running on http://localhost:5000');
});