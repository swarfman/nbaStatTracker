import React, {useState, useEffect } from 'react';
import './App.css';
import Dashboard from './Views/Dashboard/dashboard'
import Navbar from './Components/Navbar/navbar'

export default function App() {

  const [bgColor, setBgColor] = React.useState('black');


  return (
    <div style={{paddingBottom: '20px'}}>
      <Navbar />
      <Dashboard />
    </div>
  );
}

