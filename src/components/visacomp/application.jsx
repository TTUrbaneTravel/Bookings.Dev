import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserTimes,
  faMoneyBillWave,
  faClipboardCheck,
  faPlaneDeparture,
  faHotel,
  faShieldAlt,
  faCreditCard,
  faCalendar,
  faUserCheck,
  faCheckCircle,
  faIdCard,
  faHourglassHalf,
  faPassport,
  faFileExcel,
  faGlobeAmericas,
  faFingerprint,
  faFileAlt,
  faFileInvoice,
  faAddressCard,
  faInfoCircle,
  faArrowRight,
  faPlus,
  faMinus,
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../Navbar';
import Footer from '../Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import countryimage from '../../assets/uk.jpg'; // Adjust the path based on your folder structure


const UrbaneTravels = 'Urbane Travels Agency'; // Replace as needed

const Application = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [travellers, setTravellers] = useState(1);
  const [selectedValidity, setSelectedValidity] = useState('');
  const [selectedVisaType, setSelectedVisaType] = useState('');
  const [visaFee, setVisaFee] = useState(0);
  const [openAccordion, setOpenAccordion] = useState(null);

  const visaPricing = {
    'Tourist Visa': {
      '6 Months': 12971,
      '2 Years': 48724,
      '5 Years': 86959,
      '10 Years': 108614,
    },
    'Work Visa': {
      '6 Months': 50000,
      '1 Year': 95000,
      '2 Years': 180000,
      '5 Years': 350000,
    },
    'Business Visa': {
      '6 Months': 20000,
      '1 Year': 75000,
      '2 Years': 140000,
      '5 Years': 280000,
    },
    'Study Visa': {
      '6 Months': 30000,
      '1 Year': 60000,
      '2 Years': 120000,
      '5 Years': 250000,
    },
  };

  const validityOptions = [
    '6 Months',
    '1 Year',
    '2 Years',
    '5 Years',
    '10 Years',
  ];

  const formatINR = (amount) => `₹${amount.toLocaleString()}`;

  const handleVisaTypeChange = (e) => {
    setSelectedVisaType(e.target.value);
    setSelectedValidity('');
    setVisaFee(0);
  };

  const handleValidityChange = (e) => {
    setSelectedValidity(e.target.value);
    setVisaFee(visaPricing[selectedVisaType][e.target.value]);
  };

  const handleTravellersChange = (e) => {
    const value = parseInt(e.target.value, 10) || 1;
    setTravellers(value > 0 ? value : 1);
  };

  const handleStartApplication = () => {
    // Calculate total amount
    const totalAmount = visaFee ? visaFee * travellers + 1299 : 0;

    // Save information to sessionStorage
    sessionStorage.setItem('selectedVisaType', selectedVisaType);
    sessionStorage.setItem('selectedValidity', selectedValidity);
    sessionStorage.setItem('travellers', travellers);
    sessionStorage.setItem('visaFee', visaFee);
    sessionStorage.setItem('totalAmount', totalAmount);
    sessionStorage.setItem('countryName', countryId);

    // Generate a unique token and store it in sessionStorage
    const token = Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('applicationToken', token);

    // Redirect to the visa form page
    window.location.href = '/visaform';
  };

  const { countryId } = useParams();
  useEffect(() => {
    sessionStorage.setItem('countryName', countryId);
  }, [countryId]);

  useEffect(() => {
    sessionStorage.setItem('selectedVisaType', selectedVisaType);
  }, [selectedVisaType]);

  useEffect(() => {
    sessionStorage.setItem('selectedValidity', selectedValidity);
  }, [selectedValidity]);

  useEffect(() => {
    sessionStorage.setItem('travellers', travellers);
  }, [travellers]);

  useEffect(() => {
    sessionStorage.setItem('visaFee', visaFee);
  }, [visaFee]);

  const [easeOfApplying, setEaseOfApplying] = useState(0);

  useEffect(() => {
    const fetchEaseOfApplying = async () => {
      const dynamicEaseOfApplying = getEaseOfApplyingValueFromAPI(countryId);
      setEaseOfApplying(dynamicEaseOfApplying);
    };

    fetchEaseOfApplying();
  }, [countryId]);

  const getEaseOfApplyingValueFromAPI = (countryId) => {
    const mockData = { India: 7, USA: 9, UK: 8 };
    return mockData[countryId] || 10;
  };

  const reasons = [
    {
      icon: faFileExcel,
      title: 'Incomplete Documentation',
      description: 'Failure to provide required documents or incomplete forms.',
    },
    {
      icon: faUserTimes,
      title: 'Invalid Passport',
      description:
        'A passport that is expired or has less than six months validity left.',
    },
    {
      icon: faMoneyBillWave,
      title: 'Insufficient Funds',
      description:
        'Failure to demonstrate enough financial resources to cover your stay.',
    },
    {
      icon: faGlobeAmericas,
      title: 'Poor Travel History',
      description:
        'A lack of travel history or previous visa rejections may result in a denial.',
    },
    {
      icon: faClipboardCheck,
      title: 'Wrong Visa Type',
      description:
        'Applying for the wrong type of visa for the intended purpose of travel.',
    },
    {
      icon: faFingerprint,
      title: 'Criminal Record',
      description:
        'Having a criminal record or pending legal issues can lead to a visa denial.',
    },
  ];

  const faqs = [
    {
      question: 'What documents are required for the visa?',
      answer:
        'For Egypt visa, the documents required include a valid passport, recent passport-sized photographs, travel itinerary, proof of accommodation, and financial proof.',
    },
    {
      question: 'How long does the visa process take?',
      answer:
        'The processing time for an Egypt visa is generally 5-7 working days, but it may vary depending on the circumstances.',
    },
    {
      question: 'Can I extend my visa once I am in Egypt?',
      answer:
        'Yes, you can apply for an extension while in Egypt, but it is subject to approval from the Egyptian immigration authorities.',
    },
    {
      question: 'What is the cost of an Egypt visa?',
      answer:
        'The cost of an Egypt visa varies depending on the type of visa you are applying for (tourist, business, etc.). Please check with the embassy for exact pricing.',
    },
    {
      question: 'Can I get an Egypt visa on arrival?',
      answer:
        'Egypt offers visa-on-arrival for citizens of many countries. However, it is advised to check the eligibility before traveling.',
    },
  ];

  const handleAccordionClick = (index) => {
    setOpenAccordion(index === openAccordion ? null : index);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="mx-auto px-4 py-8 pt-28">
        {/* Hero Section */}
        <section className="relative hero-section mb-8 p-2">
          <div className="hero-right" data-aos="fade-left">
            <div className="relative">
              {/* Image */}
              <div className="image-box" data-aos="zoom-in">
                <img
                  src={countryimage}
                  alt="Visa Destination"
                  className="w-full h-150 object-cover rounded-md"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-md flex items-center justify-center flex-col p-4">
                {/* Text Overlay */}
                <h1
                  className="text-6xl font-bold text-white drop-shadow-lg text-center"
                  data-aos="fade-up"
                >
                  Visa Assistance for {countryId}
                </h1>
                <p
                  className="text-2xl font-medium text-white text-center mt-2"
                  data-aos="fade-down"
                >
                  Your Journey Starts Here!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Body Section */}
        <section className="body-section grid grid-cols-1 md:grid-cols-2 gap-8 p-2">
          <div className="body-left md:col-span-1">
            <div className="visa-info bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">
                ◦ {countryId} Visa Information:
              </h2>

              <div className="visa-details grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="visa-detail p-6 border border-gray-300 rounded-lg text-md bg-blue-50 hover:bg-blue-100 transition duration-300 ease-in-out">
                  <h3 className="text-xl font-medium flex items-center">
                    <FontAwesomeIcon
                      icon={faCreditCard}
                      className="mr-2 text-blue-500"
                    />{' '}
                    Visa Type:
                  </h3>
                  <p className="font-semibold text-md">
                    {selectedVisaType || 'Select Visa Type'}
                  </p>
                </div>

                <div className="visa-detail p-6 border border-gray-300 rounded-lg text-md bg-green-50 hover:bg-green-100 transition duration-300 ease-in-out">
                  <h3 className="text-xl font-medium flex items-center">
                    <FontAwesomeIcon
                      icon={faCalendar}
                      className="mr-2 text-green-500"
                    />{' '}
                    Length of Stay:
                  </h3>
                  <p className="font-semibold text-md">180 Days</p>
                </div>

                <div className="visa-detail p-6 border border-gray-300 rounded-lg text-md bg-yellow-50 hover:bg-yellow-100 transition duration-300 ease-in-out md:col-span-2">
                  <h3 className="text-xl font-medium flex items-center">
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      className="mr-2 text-yellow-500"
                    />{' '}
                    Apply For:
                  </h3>
                  <select
                    className="form-select border p-2 rounded-lg w-full text-md bg-white"
                    onChange={handleVisaTypeChange}
                    value={selectedVisaType}
                  >
                    <option value="">Select Visa Type</option>
                    {Object.keys(visaPricing).map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="visa-detail p-6 border border-gray-300 rounded-lg text-md bg-purple-50 hover:bg-purple-100 transition duration-300 ease-in-out">
                  <h3 className="text-xl font-medium flex items-center">
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="mr-2 text-purple-500"
                    />{' '}
                    Validity:
                  </h3>
                  <select
                    className="form-select border p-2 rounded-lg w-full text-md bg-white"
                    onChange={handleValidityChange}
                    value={selectedValidity}
                    disabled={!selectedVisaType}
                  >
                    <option value="">Select Validity</option>
                    {validityOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="visa-detail p-6 border border-gray-300 rounded-lg text-md bg-red-50 hover:bg-red-100 transition duration-300 ease-in-out">
                  <h3 className="text-xl font-medium flex items-center">
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      className="mr-2 text-red-500"
                    />{' '}
                    Visa Fee:
                  </h3>
                  <p className="font-semibold text-md">
                    {visaFee ? formatINR(visaFee) : 'Select options'}
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mt-8 mb-4">
                ◦ {countryId} Visa Requirements:
              </h2>
              <div className="visa-requirements grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="requirement-card p-6 border border-gray-300 rounded-lg text-md bg-gray-50 hover:bg-gray-100 transition duration-300 ease-in-out">
                  <FontAwesomeIcon
                    icon={faIdCard}
                    className="mr-2 text-blue-500"
                  />{' '}
                  Photo
                </div>
                <div className="requirement-card p-6 border border-gray-300 rounded-lg text-md bg-gray-50 hover:bg-gray-100 transition duration-300 ease-in-out">
                  <FontAwesomeIcon
                    icon={faPassport}
                    className="mr-2 text-green-500"
                  />{' '}
                  Passport
                </div>
                <div className="requirement-card p-6 border border-gray-300 rounded-lg text-md bg-gray-50 hover:bg-gray-100 transition duration-300 ease-in-out">
                  <FontAwesomeIcon
                    icon={faFileInvoice}
                    className="mr-2 text-yellow-500"
                  />{' '}
                  Bank Statement
                </div>
                <div className="requirement-card p-6 border border-gray-300 rounded-lg text-md bg-gray-50 hover:bg-gray-100 transition duration-300 ease-in-out">
                  <FontAwesomeIcon
                    icon={faAddressCard}
                    className="mr-2 text-purple-500"
                  />{' '}
                  Aadhaar Card
                </div>
                <div className="requirement-card p-6 border border-gray-300 rounded-lg text-md bg-gray-50 hover:bg-gray-100 transition duration-300 ease-in-out">
                  <FontAwesomeIcon
                    icon={faFileAlt}
                    className="mr-2 text-red-500"
                  />{' '}
                  ITR Statements
                </div>
                <div className="requirement-card p-6 border border-gray-300 rounded-lg text-md bg-gray-50 hover:bg-gray-100 transition duration-300 ease-in-out">
                  <FontAwesomeIcon
                    icon={faPlaneDeparture}
                    className="mr-2 text-orange-500"
                  />{' '}
                  Flight Tickets
                </div>
                <div className="requirement-card p-6 border border-gray-300 rounded-lg text-md bg-gray-50 hover:bg-gray-100 transition duration-300 ease-in-out">
                  <FontAwesomeIcon
                    icon={faHotel}
                    className="mr-2 text-teal-500"
                  />{' '}
                  Hotel Booking
                </div>
                <div className="requirement-card p-6 border border-gray-300 rounded-lg text-md bg-gray-50 hover:bg-gray-100 transition duration-300 ease-in-out">
                  <FontAwesomeIcon
                    icon={faShieldAlt}
                    className="mr-2 text-indigo-500"
                  />{' '}
                  Travel Insurance
                </div>
              </div>

              <h2 className="text-2xl font-bold mt-8 mb-4">
                ◦ {countryId} Visa Documents Upload Efficiency:
              </h2>
              <div className="upload-details grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="upload-box p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out text-center">
                  <div className="header">
                    <h3 className="text-lg font-bold">Ease of Applying</h3>
                    <p className="text-gray-600">
                      14112 users+ found uploading documents very easy
                    </p>
                  </div>

                  <div className="meter-container mt-4 flex justify-center items-center">
                    <CircularProgressbar
                      value={easeOfApplying * 10}
                      maxValue={100}
                      text={`${easeOfApplying * 10}%`}
                      styles={buildStyles({
                        pathColor:
                          easeOfApplying > 6
                            ? '#4caf50'
                            : easeOfApplying > 3
                            ? '#ff9800'
                            : '#f44336',
                        textColor: '#000000',
                        trailColor: '#f4f4f4',
                        strokeWidth: 6,
                      })}
                      className="w-48 h-48"
                    />
                  </div>

                  <p className="text-lg font-bold mt-4">
                    {easeOfApplying <= 3
                      ? 'Difficult'
                      : easeOfApplying <= 7
                      ? 'Moderate'
                      : 'Easy'}
                  </p>
                </div>

                <div className="upload-box p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out text-center">
                  <h3 className="text-lg font-bold">Upload Difficulty Meter</h3>
                  <p className="text-gray-600">
                    <strong>Time to Upload:</strong> 03:04 - 06:08
                  </p>

                  <div className="meter-container mt-4 flex justify-center items-center">
                    <CircularProgressbar
                      value={20}
                      maxValue={100}
                      text="20%"
                      styles={buildStyles({
                        pathColor: '#ff9800',
                        textColor: '#000000',
                        trailColor: '#f4f4f4',
                        strokeWidth: 6,
                      })}
                      className="w-48 h-48"
                    />
                  </div>

                  <p className="text-lg font-bold mt-4">Moderate</p>
                </div>
              </div>

              <div className="visa-process mt-8">
                <h2 className="text-2xl font-bold mb-4">
                  ◦ How {countryId} Visa Process Works:
                </h2>
                <div className="steps grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="step bg-blue-100 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                    <div className="step-icon mb-4">
                      <FontAwesomeIcon
                        icon={faFileAlt}
                        className="text-2xl text-blue-500"
                      />
                    </div>
                    <div className="step-content">
                      <h3 className="text-xl font-bold">Step 1</h3>
                      <p className="text-gray-600">
                        <strong>Apply on UrbaneTravels</strong>
                      </p>
                      <p className="text-gray-600">
                        Submit your documents on UrbaneTravels — only pay
                        government fee.
                      </p>
                    </div>
                  </div>

                  <div className="step bg-green-100 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                    <div className="step-icon mb-4">
                      <FontAwesomeIcon
                        icon={faUserCheck}
                        className="text-2xl text-green-500"
                      />
                    </div>
                    <div className="step-content">
                      <h3 className="text-xl font-bold">Step 2</h3>
                      <p className="text-gray-600">
                        <strong>Documents Are Verified</strong>
                      </p>
                      <p className="text-gray-600">
                        UrbaneTravels verifies your documents and submits them
                        to Immigration.
                      </p>
                    </div>
                  </div>

                  <div className="step bg-yellow-100 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                    <div className="step-icon mb-4">
                      <FontAwesomeIcon
                        icon={faHourglassHalf}
                        className="text-2xl text-yellow-500"
                      />
                    </div>
                    <div className="step-content">
                      <h3 className="text-xl font-bold">Step 3</h3>
                      <p className="text-gray-600">
                        <strong>Visa Gets Processed</strong>
                      </p>
                      <p className="text-gray-600">
                        We work with Immigration to ensure you get your visa on
                        time.
                      </p>
                    </div>
                  </div>

                  <div className="step bg-purple-100 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                    <div className="step-icon mb-4">
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-2xl text-purple-500"
                      />
                    </div>
                    <div className="step-content">
                      <h3 className="text-xl font-bold">Step 4</h3>
                      <p className="text-gray-600">
                        <strong>Visa Decision</strong>
                      </p>
                      <p className="text-gray-600">
                        If your visa is approved, you will receive the
                        documentation as well.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="visa-rejection-reasons mt-8">
                <h2 className="text-2xl font-bold mb-4">
                  ◦ What can be the Rejection Reasons for {countryId} Visa:
                </h2>
                <div className="reasons-list grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {reasons.map((reason, index) => (
                    <div
                      key={index}
                      className="reason bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                    >
                      <div className="reason-icon mb-4">
                        <FontAwesomeIcon
                          icon={reason.icon}
                          className="text-2xl text-blue-500"
                        />
                      </div>
                      <div className="reason-content">
                        <h3 className="text-xl font-bold">{reason.title}</h3>
                        <p className="text-gray-600">{reason.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="faq-section mt-8">
                <h2 className="text-2xl font-bold mb-4">
                  ◦ Frequently Asked Questions:
                </h2>
                <div className="accordion-container">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="accordion bg-white p-4 rounded-lg shadow-md mb-2"
                      onClick={() => handleAccordionClick(index)}
                    >
                      <div className="accordion-header flex justify-between items-center cursor-pointer">
                        <span className="text-xl font-bold">
                          {faq.question}
                        </span>
                        <FontAwesomeIcon
                          icon={openAccordion === index ? faMinus : faPlus}
                          className="text-2xl text-blue-500"
                        />
                      </div>
                      <div
                        className={`accordion-body ${
                          openAccordion === index ? '' : 'hidden'
                        }`}
                      >
                        <p className="text-blue-500">{faq.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="body-right md:col-span-1">
            <div
              className="visa-card bg-blue-500 text-white p-8 rounded-lg shadow-md"
              data-aos="fade-right"
            >
              <div className="visa-card">
                <div className="visa-card-body">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="visa-detail">
                      <h3 className="text-lg font-semibold">Visa Type:</h3>
                      {selectedVisaType ? (
                        <div className="selected-value bg-white text-blue-500 p-2 rounded-md">
                          {selectedVisaType}
                        </div>
                      ) : (
                        <div className="selected-value bg-white text-gray-500 p-2 rounded-md">
                          Not selected
                        </div>
                      )}
                    </div>

                    <div className="visa-detail">
                      <h3 className="text-lg font-semibold">Visa Validity:</h3>
                      {selectedValidity ? (
                        <div className="selected-value bg-white text-blue-500 p-2 rounded-md">
                          {selectedValidity}
                        </div>
                      ) : (
                        <div className="selected-value bg-white text-gray-500 p-2 rounded-md">
                          Not selected
                        </div>
                      )}
                    </div>

                    <div className="visa-detail">
                      <h3 className="text-lg font-semibold flex items-center">
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="mr-2 text-white"
                        />{' '}
                        Number of Travellers:
                      </h3>
                      <div className="selected-value bg-white text-blue-500 rounded-md">
                        <input
                          type="number"
                          className="form-control w-full border border-white rounded-md p-2"
                          min="1"
                          value={travellers}
                          onChange={handleTravellersChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="price-item">
                      <p className="text-lg font-semibold">Visa Fee:</p>
                      <span className="price-amount text-xl font-bold">
                        {visaFee ? formatINR(visaFee) : 'Select options'}
                      </span>
                    </div>

                    <div className="price-item">
                      <p className="text-lg font-semibold">
                        UrbaneTravels Fees:
                      </p>
                      <span className="price-amount text-xl font-bold">
                        {formatINR(1299)}
                      </span>
                    </div>
                  </div>

                  <div className="disclaimer-box bg-yellow-500 text-white p-2 rounded-md mb-4">
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="mr-2 text-white"
                    />
                    <large>
                      The visa fees are subject to change based on government
                      regulations and additional service charges. Please check
                      before proceeding. Note that processing times may vary
                      depending on the volume of applications and other factors.
                      Ensure you have all required documents ready to avoid
                      delays.
                    </large>
                  </div>
                </div>

                <div className="visa-card-footer border border-white p-4 text-white rounded-md bg-gradient-to-r from-blue-400 to-orange-400 flex flex-col items-center">
                  <div className="total-amount mb-4">
                    <h3 className="text-2xl font-bold">
                      Total Amount:{' '}
                      {visaFee
                        ? formatINR(visaFee * travellers + 1299)
                        : 'Select options'}
                    </h3>
                    <p className="text-sm mt-2">
                      This includes all applicable fees and charges.
                    </p>
                  </div>
                  <div className="start-application">
                    <button
                      className="start-application-btn bg-gradient-to-r from-orange-400 to-blue-400 text-white p-2 rounded-md border border-white hover:from-orange-500 hover:to-blue-500 flex items-center"
                      onClick={handleStartApplication}
                    >
                      <span className="mr-2">Start Application</span>
                      <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Application;
