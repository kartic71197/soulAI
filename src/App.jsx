import { useState, useEffect } from "react";
import soulAI from "./assets/soulai.png";
import { FaEdit } from "react-icons/fa";
import sampleData from "./sampleData.json";
import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Home from "./home";
import History from "./history";

function App() {
  
  return(
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
