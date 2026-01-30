import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import ProductDetails from "./components/ProductDetails";

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/product/:id" element={isLoggedIn ? <ProductDetails /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
