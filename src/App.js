import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Feedback from './Components/Feedback';
import SensorDisplay from './SensorDisplay'; // Import SensorDisplay
import CropMap from './Components/CropMap';

import './App.css';
const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <CropMap/>
        <Routes>
       
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/sensor-data" element={<SensorDisplay />} /> {/* New route for sensor data */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;