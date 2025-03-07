import React from 'react';
import { IoIosAirplane } from 'react-icons/io';
import Searchbox from '../components/flightcomp/search';
import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";

const FlightSearch = () => {
  const cityPairs = [
    { depart: 'New York', arrive: 'London' },
    { depart: 'Los Angeles', arrive: 'Tokyo' },
    { depart: 'Paris', arrive: 'Dubai' },
    { depart: 'Sydney', arrive: 'Singapore' },
    { depart: 'Los Angeles', arrive: 'Tokyo' },
    { depart: 'Paris', arrive: 'Dubai' },
    { depart: 'Los Angeles', arrive: 'Tokyo' },
    { depart: 'Paris', arrive: 'Dubai' },
  ];
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How do I book a flight?",
      answer:
        "You can book a flight by searching for your desired route and selecting the flight that suits you best. Follow the on-screen instructions to complete your booking.",
    },
    {
      question: "Can I change my booking?",
      answer:
        "Yes, you can change your booking by logging into your account and navigating to the 'My Bookings' section. Follow the instructions to modify your booking.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "Our cancellation policy varies depending on the type of ticket you have purchased. Please refer to the terms and conditions associated with your booking for specific details.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "Refund policies depend on the airline and ticket type. Please review the refund policy while booking or check your booking details for more information.",
    },
    {
      question: "Can I select my seat in advance?",
      answer:
        "Yes, you can select your seat while booking your flight or later through the 'Manage Booking' section on our website.",
    },
    {
      question: "What should I do if I miss my flight?",
      answer:
        "If you miss your flight, contact the airline immediately. Some airlines offer rebooking options depending on availability and fare rules.",
    },
  ];
  const benefits = [
    {
      title: 'Exciting Offers',
      description:
        'Book your next adventure with ease and enjoy exclusive deals on flights.',
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48px"
          viewBox="0 0 24 24"
          width="48px"
          fill="#4facfe"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="m21.41 11.58-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM13 20.01 4 11V4h7v-.01l9 9-7 7.02z" />
          <circle cx="6.5" cy="6.5" r="1.5" />
        </svg>
      ),
    },
    {
      title: 'Easy Process',
      description:
        'Fly smarter with hassle-free bookings and great savings on every flight.',
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enableBackground="new 0 0 24 24"
          height="60px"
          viewBox="0 0 24 24"
          width="60px"
          fill="#4facfe"
        >
          <g>
            <rect fill="none" height="24" width="24" />
          </g>
          <g>
            <g>
              <path d="M6,15c-0.83,0-1.58,0.34-2.12,0.88C2.7,17.06,2,22,2,22s4.94-0.7,6.12-1.88C8.66,19.58,9,18.83,9,18C9,16.34,7.66,15,6,15 z M6.71,18.71c-0.28,0.28-2.17,0.76-2.17,0.76s0.47-1.88,0.76-2.17C5.47,17.11,5.72,17,6,17c0.55,0,1,0.45,1,1 C7,18.28,6.89,18.53,6.71,18.71z M17.42,13.65L17.42,13.65c6.36-6.36,4.24-11.31,4.24-11.31s-4.95-2.12-11.31,4.24l-2.49-0.5 C7.21,5.95,6.53,6.16,6.05,6.63L2,10.69l5,2.14L11.17,17l2.14,5l4.05-4.05c0.47-0.47,0.68-1.15,0.55-1.81L17.42,13.65z M7.41,10.83L5.5,10.01l1.97-1.97l1.44,0.29C8.34,9.16,7.83,10.03,7.41,10.83z M13.99,18.5l-0.82-1.91 c0.8-0.42,1.67-0.93,2.49-1.5l0.29,1.44L13.99,18.5z M16,12.24c-1.32,1.32-3.38,2.4-4.04,2.73l-2.93-2.93 c0.32-0.65,1.4-2.71,2.73-4.04c4.68-4.68,8.23-3.99,8.23-3.99S20.68,7.56,16,12.24z M15,11c1.1,0,2-0.9,2-2s-0.9-2-2-2s-2,0.9-2,2 S13.9,11,15,11z" />
            </g>
          </g>
        </svg>
      ),
    },
    {
      title: '24/7 Support',
      description:
        'Travel with confidence, knowing our 24/7 support is just a call away.',
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enableBackground="new 0 0 24 24"
          height="60px"
          width="60px"
          viewBox="0 0 24 24"
          fill="#4facfe"
        >
          <g>
            <rect fill="none" height="24" width="24" x="0" />
          </g>
          <g>
            <g>
              <path d="M10,6C9.32,6,6.12,6.51,6.01,9.88c1.72-0.4,3.06-1.77,3.4-3.51c0.53,1.15,1.96,2.8,4.43,2.6C13.39,7.26,11.85,6,10,6z" />
              <circle cx="7.5" cy="10.75" r=".75" />
              <circle cx="12.5" cy="10.75" r=".75" />
              <path d="M16,10c0-3.31-2.69-6-6-6s-6,2.69-6,6c-0.55,0-1,0.45-1,1v2c0,0.55,0.45,1,1,1h1v-4c0-2.76,2.24-5,5-5s5,2.24,5,5v5H9v1h6 c0.55,0,1-0.45,1-1v-1c0.55,0,1-0.45,1-1v-2C17,10.45,16.55,10,16,10z" />
            </g>
          </g>
        </svg>
      ),
    },
    {
      title: 'Affordable Prices',
      description:
        'Get the best deals with our lowest price guarantee – book your next flight with us today!',
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enableBackground="new 0 0 24 24"
          height="60px"
          viewBox="0 0 24 24"
          width="60px"
          fill="#4facfe"
        >
          <g>
            <path d="M0,0h24v24H0V0z" fill="none" />
          </g>
          <g>
            <g>
              <path d="M11,13V9c0-0.55-0.45-1-1-1H6V6h5V4H8.5V3h-2v1H5C4.45,4,4,4.45,4,5v4c0,0.55,0.45,1,1,1h4v2H4v2h2.5v1h2v-1H10 C10.55,14,11,13.55,11,13z" />
              <polygon points="19.59,12.52 13.93,18.17 11.1,15.34 9.69,16.76 13.93,21 21,13.93" />
            </g>
          </g>
        </svg>
      ),
    },
  ];

  return (
    <div className="flight-page min-h-screen pt-26">
      {/* Searchbox Component */}
      <div className="search-box ">
        <Searchbox />
      </div>
      <div className="bg-white  p-6 mt-8">
        <h2 className="text-2xl text-center font-bold mb-4 text-orange-400">
          Popular Flights
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cityPairs.map((pair, index) => (
            <div
              key={index}
              className="transition-shadow hover:shadow-lg border border-gray-300 rounded-lg"
            >
              <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
                {/* Departure City */}
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {pair.depart}
                  </h3>
                  <p className="text-sm text-gray-500">Departure City</p>
                </div>

                {/* Airplane Icon */}
                <div className="flex items-center mx-2 text-orange-400">
                  <IoIosAirplane size={40} />
                </div>

                {/* Arrival City */}
                <div className="flex flex-col text-right">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {pair.arrive}
                  </h3>
                  <p className="text-sm text-gray-500">Arrival City</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Why Book With Us Section */}
      <div className="why-book-with-us p-6 mt-2 text-center">
        <h2 className="text-2xl font-bold mb-6 text-orange-400">
          Why Book With Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-white shadow-lg rounded-2xl border border-gray-300 transition-transform transform hover:scale-105"
            >
              {/* SVG with Blue-400 color */}
              <div className="mb-4 text-blue-400">{benefit.svg}</div>

              {/* Title with Orange-400 color */}
              <h3 className="text-xl font-semibold text-orange-400 mb-2">
                {benefit.title}
              </h3>

              {/* Description with gray text */}
              <p className="text-gray-600 text-center">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white  p-6 mt-8 ">
      <h2 className="text-2xl font-bold mb-4  text-center text-orange-400">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-300 rounded-lg p-4 bg-gray-100 hover:bg-gray-200 transition duration-300">
            <button
              className="flex justify-between items-center text-lg font-semibold w-full text-left text-blue-400 hover:text-orange-400 focus:outline-none"
              onClick={() => setOpenIndex(index === openIndex ? null : index)}
            >
              {faq.question}
              {openIndex === index ? (
                <IoIosArrowUp className="text-orange-400" size={20} />
              ) : (
                <IoIosArrowDown className="text-orange-400" size={20} />
              )}
            </button>
            {openIndex === index && (
              <p className="text-gray-600 mt-2 p-2 border-l-4 border-orange-400">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>

      {/* Terms and Conditions Section */}
      <div className="bg-white p-6">
      {/* Header Section */}
      <div className="flex items-center space-x-3 border-b-2 border-orange-400 pb-3">
        <IoWarningOutline size={28} className="text-orange-400" />
        <h2 className="text-2xl font-bold text-blue-400">Terms and Conditions</h2>
      </div>

      {/* Content Section */}
      <div className="mt-4 space-y-4 text-gray-700">
        <p>
          By using our service, you agree to our terms and conditions. Please read them carefully before proceeding with any bookings.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <span className="text-blue-400 font-semibold">Booking Responsibility:</span> Users must ensure their booking details are accurate before confirmation.
          </li>
          <li>
            <span className="text-blue-400 font-semibold">Cancellation Policy:</span> Cancellations are subject to applicable fees. Refunds depend on airline policies.
          </li>
          <li>
            <span className="text-blue-400 font-semibold">Payment Security:</span> We use encrypted transactions to protect your payment details.
          </li>
          <li>
            <span className="text-blue-400 font-semibold">Changes and Modifications:</span> Any modifications must be made within the stipulated time frame.
          </li>
        </ul>
      </div>

      {/* Footer Section */}
      <div className="mt-6 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-lg text-blue-600">
        By proceeding, you acknowledge that you have read and agree to our terms.
      </div>
    </div>
    </div>
  );
};

export default FlightSearch;
