import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

// Import country images
import UK from '../assets/visaassets/UK.avif';
import USA from '../assets/visaassets/usa.jpg';
import Dubai from '../assets/visaassets/dubai.jpg';
import Australia from '../assets/visaassets/Australia.jpg';
import Egypt from '../assets/visaassets/egypt.jpg';
import VisaBanner from '../assets/banners/mainbanner2.jpg'; // Ensure this path is correct

const Visa = () => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState('');

  const countryData = [
    {
      name: 'UK ',
      minPrice: 12000,
      maxPrice: 150000,
      visaTypes: [
        'Standard Visitor Visa',
        'Work Visa',
        'Student Visa',
        'Dependent Visa',
      ],
      image: UK,
    },
    {
      name: 'USA',
      minPrice: 10000,
      maxPrice: 200000,
      visaTypes: ['Tourist Visa', 'Business Visa', 'Student Visa', 'Work Visa'],
      image: USA,
      status: 'coming soon',
    },
    {
      name: 'Dubai',
      minPrice: 10000,
      maxPrice: 200000,
      visaTypes: ['Tourist Visa', 'Business Visa', 'Student Visa', 'Work Visa'],
      image: Dubai,
      status: 'coming soon',
    },
    {
      name: 'Australia',
      minPrice: 10000,
      maxPrice: 200000,
      visaTypes: ['Tourist Visa', 'Business Visa', 'Student Visa', 'Work Visa'],
      image: Australia,
      status: 'coming soon',
    },
    {
      name: 'Egypt',
      minPrice: 10000,
      maxPrice: 200000,
      visaTypes: ['Tourist Visa', 'Business Visa', 'Student Visa', 'Work Visa'],
      image: Egypt,
      status: 'coming soon',
    },
  ];

  const handleClick = (countryName) => {
    const selectedCountryData = countryData.find(
      (country) => country.name === countryName,
    );
    if (selectedCountryData) {
      if (selectedCountryData.status === 'coming soon') {
        toast.error('Visa for this country is not available.', {
          position: 'top-center',
          duration: 3000,
        });
      } else {
        // Store the selected country data in session storage
        sessionStorage.setItem('selectedCountryData', JSON.stringify(selectedCountryData));
        navigate(`/instructions/${countryName}`); // Ensure the route matches the one defined in App.js
      }
    } else {
      toast.error("This country's visa is not available yet.", {
        position: 'top-center',
        duration: 3000,
      });
    }
  };

  return (
    <div
      className="min-h-[100vh] bg-cover bg-center bg-fixed flex flex-col items-center justify-start px-6 md:px-12 py-16 relative"
      style={{ backgroundImage: `url(${VisaBanner})` }}
    >
      <Toaster position="top-center" reverseOrder={false} />

      {/* Search Box */}
      <div className="flex items-center justify-center h-[30vh] w-full">
        <div className="w-full max-w-2xl bg-white bg-opacity-60 p-6 rounded-xl shadow-lg text-center text-black">
          <h2 className="text-2xl font-bold mb-4">Where To?</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              id="destination"
              name="destination"
              className="w-full  rounded-lg px-4 py-3  text-black focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="">Select a destination</option>
              {countryData.map((country, index) => (
                <option key={index} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="bg-[#fb923c] hover:bg-[#0e92e8] text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all"
              onClick={() => handleClick(selectedCountry)}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Subtitle */}
      <p className=" text-xl bg-white px-8 py-2 bg-opacity-60 rounded-xl  text-center font-semibold text-black">
        Explore all available options below.
      </p>

      {/* Visa Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {countryData.map((country, index) => (
          <div
            key={index}
            className="bg-white  bg-opacity-60 shadow-lg p-6 rounded-xl transform transition-all hover:scale-105 hover:shadow-2xl cursor-pointer text-black"
          >
            <img
              className="w-full h-40 object-cover rounded-lg"
              src={country.image}
              alt={`${country.name} Image`}
            />
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">{country.name}</h3>
                <p className="font-semibold bg-[#0e92e8] text-white px-3 py-1 text-sm rounded-lg">
                  ₹{country.minPrice} - ₹{country.maxPrice}
                </p>
              </div>
              <ul className="text-sm bg-[#f0f8ff] text-[#0e92e8] mt-2 p-3 rounded-lg shadow-md border border-[#0e92e8]">
                {country.visaTypes.map((visa, i) => (
                  <li key={i} className="py-1 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#0e92e8] rounded-full"></span>
                    <span className="font-semibold">{visa}</span>
                  </li>
                ))}
              </ul>

              {country.status === 'coming soon' ? (
                <p className="mt-4 w-full bg-[#FF3B30] text-white font-semibold px-4 py-2 rounded-lg shadow-md text-center">
                  Coming Soon
                </p>
              ) : (
                <button
                  className="mt-4 w-full bg-[#fb923c] text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-[#0e92e8] transition-all"
                  onClick={() => handleClick(country.name)}
                >
                  Apply Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Visa;