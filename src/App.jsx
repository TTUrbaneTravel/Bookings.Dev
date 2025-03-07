import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Visa from "./pages/visa";
import Flight from "./pages/flight";

import Instructions from "./components/visacomp/instructions"; // Import Instructions component
import Application from "./components/visacomp/application"; // Import Application component
import Visaform from "./components/visacomp/visaform"; // Import Visaform component
import Checkout from "./pages/checkout"; // Import Checkout component

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./index.css"; // Import global styles

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/visa" element={<Visa />} />
        <Route path="/flights" element={<Flight />} />
        <Route path="/instructions/:countryId" element={<Instructions />} />
        <Route path="/application/:countryId" element={<Application />} />
        <Route path="/visaform/" element={<Visaform />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;