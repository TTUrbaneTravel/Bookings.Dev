import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">

        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold text-white">About UrbaneTravels</h2>
          <p className="mt-2 text-gray-400">
            Discover the world with UrbaneTravels. From curated trips to exclusive deals, we make your travel dreams come true.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold text-white">Quick Links</h2>
          <ul className="mt-3 space-y-2">
            <li><a href="#" className="hover:text-blue-400 transition">Home</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Destinations</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Tours</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Special Offers</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Travel Blog</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h2 className="text-xl font-bold text-white">Our Services</h2>
          <ul className="mt-3 space-y-2">
            <li><a href="#" className="hover:text-blue-400 transition">Flight Bookings</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Hotel Reservations</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Customized Packages</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Travel Insurance</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Guided Tours</a></li>
          </ul>
        </div>

        {/* Support & Contact */}
        <div>
          <h2 className="text-xl font-bold text-white">Support & Contact</h2>
          <ul className="mt-3 space-y-2">
            <li><a href="#" className="hover:text-blue-400 transition">FAQs</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Customer Support</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Privacy Policy</a></li>
          </ul>
          <p className="mt-3 text-gray-400">Email: support@urbanetravels.com</p>
          <p className="text-gray-400">Phone: +1 (987) 654-3210</p>
        </div>
      </div>

      {/* Social Icons */}
      <div className="flex justify-center space-x-5 mt-8">
        <a href="#" className="text-gray-400 hover:text-blue-400 transition text-2xl"><FaFacebookF /></a>
        <a href="#" className="text-gray-400 hover:text-blue-400 transition text-2xl"><FaTwitter /></a>
        <a href="#" className="text-gray-400 hover:text-blue-400 transition text-2xl"><FaInstagram /></a>
        <a href="#" className="text-gray-400 hover:text-blue-400 transition text-2xl"><FaYoutube /></a>
        <a href="#" className="text-gray-400 hover:text-blue-400 transition text-2xl"><FaLinkedin /></a>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 mt-10 border-t border-gray-700 pt-5">
        &copy; {new Date().getFullYear()} UrbaneTravels. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
