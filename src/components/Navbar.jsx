import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faBars } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import flightImg from '../assets/flighticon.png';
import hotelImg from '../assets/hotelicon.png';
import trainImg from '../assets/trainicon.png';
import busImg from '../assets/busicon.png';
import cabImg from '../assets/cabicon.png';
import visaImg from '../assets/visaicon.png';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { name: 'Flights', img: flightImg, path: '/flights' },
    { name: 'Hotels', img: hotelImg, path: '/hotels' },
    { name: 'Trains', img: trainImg, path: '/trains' },
    { name: 'Bus', img: busImg, path: '/bus' },
    { name: 'Cabs', img: cabImg, path: '/cabs' },
    { name: 'Visa', img: visaImg, path: '/visa' },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="container mx-auto p-3 flex justify-between items-center">
          {/* Company Logo */}
          <div className="flex items-center">
            <img src={logo} alt="Urbane Travels" className="h-14 w-auto" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-3 gap-4">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="w-20 h-20 flex gap-2 flex-col items-center justify-center rounded-lg p-2 transition bg-transparent hover:bg-[#0e92e8] group"
              >
                <img src={item.img} alt={item.name} className="w-8 h-8" />
                <span className="text-xs text-gray-700 group-hover:text-white transition">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Login, Customer Care & Social Icons */}
          <div className="hidden md:flex space-x-4 items-center">
            <button className="px-3 py-1 border border-blue-500 text-blue-500 rounded-lg transition hover:bg-[#0e92e8] hover:text-white">
              Login
            </button>
            <button className="px-3 py-1 border border-blue-500 text-blue-500 rounded-lg transition hover:bg-[#0e92e8] hover:text-white">
              Customer Care
            </button>
            <div className="flex space-x-2">
  <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-[#0e92e8] hover:text-white transition">
    <FontAwesomeIcon icon={faFacebook} size="lg" />
  </a>
  <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-[#0e92e8] hover:text-white transition">
    <FontAwesomeIcon icon={faTwitter} size="lg" />
  </a>
  <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-[#0e92e8] hover:text-white transition">
    <FontAwesomeIcon icon={faInstagram} size="lg" />
  </a>
</div>

          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsSidebarOpen(true)} className="text-gray-700 focus:outline-none">
              <FontAwesomeIcon icon={faBars} size="lg" />
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar for Mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg p-5">
            {/* Close Button */}
            <button onClick={() => setIsSidebarOpen(false)} className="absolute top-4 right-4 text-gray-600">
              <FontAwesomeIcon icon={faX} size="lg" />
            </button>

            {/* Sidebar Menu */}
            <div className="mt-8 space-y-4">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="w-full flex gap-3 items-center p-2 rounded-lg transition hover:bg-[#0e92e8] group"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <img src={item.img} alt={item.name} className="w-6 h-6" />
                  <span className="text-sm text-gray-700 group-hover:text-white transition">
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>

            {/* Sidebar Buttons */}
            <div className="mt-6 space-y-3">
              <button className="w-full px-4 py-2 border border-blue-500 text-blue-500 rounded-lg transition hover:bg-[#0e92e8] hover:text-white">
                Login
              </button>
              <button className="w-full px-4 py-2 border border-blue-500 text-blue-500 rounded-lg transition hover:bg-[#0e92e8] hover:text-white">
                Customer Care
              </button>
            </div>

            {/* Sidebar Social Icons */}
            <div className="mt-6 flex justify-center space-x-3">
              <a href="#" className="p-3 rounded-full border border-gray-300 hover:bg-[#0e92e8] hover:text-white transition">
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>
              <a href="#" className="p-3 rounded-full border border-gray-300 hover:bg-[#0e92e8] hover:text-white transition">
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
              <a href="#" className="p-3 rounded-full border border-gray-300 hover:bg-[#0e92e8] hover:text-white transition">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
