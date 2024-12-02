// src/Components/SensorCard.js

import React from 'react';
import './SensorCard.css';

const SensorCard = ({ title, type, value, status }) => {
    console.log("SensorCard props:", { title, type, value, status });

    return (
        <div className="card">
            <h3>{title}</h3>
            <p className="sensor-type">{type}</p>
            <div className="value">{value}</div>
            <span className={`status-badge status-${status.toLowerCase()}`}>{status}</span>
        </div>
    );
};

export default SensorCard;