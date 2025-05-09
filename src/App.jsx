// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Users from "./Users";
import Background from "./Background";  // Importe o componente Background

const App = () => {
  return (
    <Background>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Background>
  );
};

export default App;
