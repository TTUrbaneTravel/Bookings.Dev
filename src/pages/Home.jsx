import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import mainBanner from '../assets/banners/mainbanner.jpg';
import mainBanner2 from '../assets/banners/mainbanner2.jpg';
import mainBanner3 from '../assets/banners/mainbanner3.jpg';

const Home = () => {
  // Array of banner images for the slider
  const images = [mainBanner, mainBanner2, mainBanner3];

  // Settings for the react-slick slider
  const sliderSettings = {
    dots: false, // Hide dots navigation
    infinite: true, // Infinite loop sliding
    speed: 2000, // Transition speed in milliseconds
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll
    autoplay: true, // Enable autoplay
    autoplaySpeed: 4000, // Autoplay interval in milliseconds
    fade: true, // Use fade transition
    arrows: false, // Hide navigation arrows
  };

  // State for trip type (one-way, round-trip, multi-city)
  const [tripType, setTripType] = useState('one-way');

  // State for selected fare type (e.g., Regular, Student, etc.)
  const [selectedFare, setSelectedFare] = useState('');

  return (
    <div className="w-full">
      {/* Hero Section: Contains the banner slider and search overlay */}
      <div className="relative w-full h-[80vh]">
        {/* Slider Component */}
        <Slider {...sliderSettings} className="absolute w-full h-full">
          {images.map((src, index) => (
            <div key={index} className="w-full h-[80vh]">
              <img
                src={src}
                alt={`slide-${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Slider>

        {/* Overlay Search Box */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-7xl w-full">
            {/* Trip Type Selection Buttons */}
            <div className="flex justify-center mb-4">
              {['one-way', 'round-trip', 'multi-city'].map((type) => (
                <button
                  key={type}
                  onClick={() => setTripType(type)}
                  className={`px-4 py-2 mx-1 rounded-lg text-sm font-medium transition-all ${
                    tripType === type
                      ? 'bg-[#fb923c] text-white' // Active button style
                      : 'text-gray-500 hover:bg-gray-100' // Inactive button style
                  }`}
                >
                  {type.replace('-', ' ').toUpperCase()}
                </button>
              ))}
            </div>

            {/* Search Form */}
            <form className="space-y-6">
              {/* First Row: Input Fields for Trip Details */}
              <div className="grid grid-cols-6 gap-4">
                {/* From Input */}
                <div className="col-span-1 w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    From
                  </label>
                  <input
                    type="text"
                    placeholder="Enter city or airport"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* To Input */}
                <div className="col-span-1 w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    To
                  </label>
                  <input
                    type="text"
                    placeholder="Enter city or airport"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Departure Date Input */}
                <div className="col-span-1 w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Departure
                  </label>
                  <input
                    type="date"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Return Date Input (Visible only for round-trip) */}
                {tripType === 'round-trip' && (
                  <div className="col-span-1 w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Return
                    </label>
                    <input
                      type="date"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}

                {/* Multi-City Stops Input (Visible only for multi-city) */}
                {tripType === 'multi-city' && (
                  <div className="col-span-2 w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Multi-City Stops
                    </label>
                    <input
                      type="text"
                      placeholder="Enter cities or airports"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}

                {/* Passengers Dropdown */}
                <div className="col-span-1 w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Passengers
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                    <option>1 Adult</option>
                    <option>2 Adults</option>
                    <option>3 Adults</option>
                    <option>Family</option>
                  </select>
                </div>
              </div>

              {/* Second Row: Special Fare Selection */}
              <div className="grid grid-cols-5 gap-0 justify-around">
                {[
                  'Regular',
                  'Student',
                  'Senior Citizen',
                  'Armed Forces',
                  'Doctor and Nurses',
                ].map((fare, index) => (
                  <label key={index} className="w-full">
                    <input
                      type="radio"
                      name="fare"
                      value={fare}
                      checked={selectedFare === fare}
                      onChange={() => setSelectedFare(fare)}
                      className="hidden"
                    />
                    <div
                      className={`p-2 border border-gray-400 text-sm rounded-md cursor-pointer text-center font-medium transition-all w-40 ${
                        selectedFare === fare
                          ? 'bg-[#fb923c] text-white border-[#fb923c]' // Selected fare style
                          : 'bg-white hover:bg-gray-100 hover:border-gray-600' // Unselected fare style
                      }`}
                    >
                      {fare}
                    </div>
                  </label>
                ))}
              </div>

              {/* Third Row: Search Button */}
              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-[#fb923c] text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-all"
                >
                  Search Flights
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;