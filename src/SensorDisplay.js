import React, { useEffect, useState } from 'react';

function SensorDisplay() {
  const [sensorData, setSensorData] = useState(null);

  useEffect(() => {
    // Connect to WebSocket server at backend server URL
    const socket = new WebSocket('ws://localhost:5000');

    // Listen for messages from the server
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setSensorData(data.sensorData); // Update state with new sensor data
    };

    // Clean up WebSocket connection on component unmount
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <h1>Real-Time Sensor Data</h1>
      {sensorData ? (
        <p>Sensor Value: {sensorData}</p>
      ) : (
        <p>Waiting for data...</p>
      )}
    </div>
  );
}

export default SensorDisplay;