import React from 'react';
import './App.css';
import Dashboard from './Views/Dashboard/dashboard'
import Navbar from './Components/Navbar/navbar'

export default function App() {
  return (
    <div>
      <Navbar />
      <Dashboard />
    </div>
  );
}

