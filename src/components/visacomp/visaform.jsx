import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Formik, Form, Field } from 'formik';

const VisaApplication = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDateConfirmed, setIsDateConfirmed] = useState(false);
  const [country, setCountry] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [passportImage, setPassportImage] = useState({
    front: null,
    back: null,
  });
  const [isProfilePictureConfirmed, setIsProfilePictureConfirmed] =
    useState(false);
  const [isPassportConfirmed, setIsPassportConfirmed] = useState(false);
  const [isTravellerDetailsConfirmed, setIsTravellerDetailsConfirmed] =
    useState(false);
  const [isDocumentsUploaded, setIsDocumentsUploaded] = useState(false);
  const [step, setStep] = useState(1);
  const [uploadedDocument, setUploadedDocument] = useState(null);
  const navigate = useNavigate();
  const [applicationId, setApplicationId] = useState(''); // Initialize applicationId

  useEffect(() => {
    setCountry(sessionStorage.getItem('selectedCountry') || '');
  }, [country]);



  const getCountryCode = (country) => {
    const countryCodes = {
      'United States': 'US',
      Canada: 'CA',
      Germany: 'DE',
      India: 'IN',
      France: 'FR',
    };
    return countryCodes[country] || 'XX';
  };

  const handleConfirmDate = () => {
    if (selectedDate) {
      toast.success(
        `Date confirmed: ${selectedDate.toISOString().split('T')[0]}`,
        {
          position: 'top-center',
          duration: 3000,
        },
      );
      setIsDateConfirmed(true);
      setStep(2);
    } else {
      toast.error('Please select a date first!', {
        position: 'top-center',
        duration: 3000,
      });
    }
  };

  const handleProfilePictureUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setProfilePicture(base64String);
      sessionStorage.setItem('profilePicture', base64String);
      toast.success('Profile picture uploaded successfully!', {
        position: 'top-center',
        duration: 3000,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleConfirmProfilePicture = () => {
    toast.success('Profile image confirmed successfully!', {
      position: 'top-center',
      duration: 3000,
    });
    setIsProfilePictureConfirmed(true);
    setStep(3);
  };

  const handlePassportUpload = (side, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setPassportImage((prev) => ({ ...prev, [side]: base64String }));
    };
    reader.readAsDataURL(file);
  };

  const handleConfirmPassport = () => {
    toast.success('Passport image confirmed successfully!', {
      position: 'top-center',
      duration: 3000,
    });
    setIsPassportConfirmed(true);
    setStep(4);
  };

  const handleConfirmTravellerDetails = (values) => {
    toast.success('Traveller details confirmed successfully!', {
      position: 'top-center',
      duration: 3000,
    });
    setIsTravellerDetailsConfirmed(true);
    sessionStorage.setItem('travellerDetails', JSON.stringify(values));
    setStep(5);
  };

  const handleDocumentUpload = (file) => {
    setUploadedDocument(file);
    toast.success('Document uploaded successfully!', {
      position: 'top-center',
      duration: 3000,
    });
  };

  const handleConfirmDocument = () => {
    toast.success('Document confirmed successfully!', {
      position: 'top-center',
      duration: 3000,
    });
    setIsDocumentsUploaded(true);
    setStep(6);
  };

  const handleProceedToPayment = () => {
    navigate('/checkout');
  };

  const handleSubmit = (values) => {
    handleConfirmTravellerDetails(values);
  };

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="mx-auto p-4 pt-30">
      <Toaster />
      <div className="flex flex-row gap-4">
        <div className="w-3/4 bg-gray-100 p-4 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-4">
            Complete your Visa Application in 5 Easy Steps
          </h2>

        

          {!isDateConfirmed ? (
            <div>
              <h3 className="text-xl font-bold mb-4">Step 1: Select Date</h3>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={new Date()}
                dateFormat="yyyy/MM/dd"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <button
                className="bg-green-500 text-white p-2 rounded-md mt-4 hover:bg-green-700"
                onClick={handleConfirmDate}
              >
                Confirm Date
              </button>
            </div>
          ) : isDateConfirmed && !isProfilePictureConfirmed ? (
            <div>
              <h3 className="text-xl font-bold mb-4">
                Step 2: Upload Profile Picture
              </h3>
              <input
                type="file"
                onChange={(e) => handleProfilePictureUpload(e.target.files[0])}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {profilePicture && (
                <div className="mt-4">
                  <img
                    src={profilePicture}
                    alt="Profile"
                    className="w-auto h-48 rounded shadow-md"
                  />
                  <button
                    className="bg-green-500 text-white p-2 rounded-md mt-4 hover:bg-green-700"
                    onClick={handleConfirmProfilePicture}
                  >
                    Confirm Image
                  </button>
                </div>
              )}
            </div>
          ) : isProfilePictureConfirmed && !isPassportConfirmed ? (
            <div>
              <h3 className="text-xl font-bold mb-4">
                Step 3: Upload Passport Images
              </h3>
              <input
                type="file"
                onChange={(e) =>
                  handlePassportUpload('front', e.target.files[0])
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="file"
                onChange={(e) =>
                  handlePassportUpload('back', e.target.files[0])
                }
                className="w-full p-2 border border-gray-300 rounded-md mt-2"
              />
              {passportImage.front && passportImage.back && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="relative">
                    <img
                      src={passportImage.front}
                      alt="Passport Front"
                      className="w-auto h-48 rounded shadow-md"
                    />
                    <span className="absolute top-0 left-0 bg-green-500 text-white p-1 rounded-bl-md">
                      Front
                    </span>
                  </div>
                  <div className="relative">
                    <img
                      src={passportImage.back}
                      alt="Passport Back"
                      className="w-auto h-48 rounded shadow-md"
                    />
                    <span className="absolute top-0 left-0 bg-green-500 text-white p-1 rounded-bl-md">
                      Back
                    </span>
                  </div>
                  <button
                    className="bg-green-500 text-white p-2 rounded-md mt-4 hover:bg-green-700"
                    onClick={handleConfirmPassport}
                  >
                    Confirm Passport
                  </button>
                </div>
              )}
            </div>
          ) : isPassportConfirmed && !isTravellerDetailsConfirmed ? (
            <div className="application-form-container">
              <div className="form-container">
                <Formik
                  initialValues={{
                    fullName: '',
                    passportNumber: '',
                    aadharNo: '',
                    passportIssueDate: null,
                    passportExpiryDate: null,
                    dob: null,
                    placeOfBirth: '',
                    countryOfBirth: '',
                    mobileNumber: '',
                    emailId: '',
                  }}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      {step === 1 && (
                        <div>
                          <h3 className="text-xl font-bold mb-4">
                            Step 1: Personal Details
                          </h3>
                          <div className="form-group">
                            <label>Full Name</label>
                            <Field
                              type="text"
                              name="fullName"
                              className="w-full p-2 border border-gray-300 rounded-md mb-2"
                            />
                          </div>
                          <div className="form-group">
                            <label>Passport Number</label>
                            <Field
                              type="text"
                              name="passportNumber"
                              className="w-full p-2 border border-gray-300 rounded-md mb-2"
                            />
                          </div>
                          <div className="form-group">
                            <label>Aadhar Number</label>
                            <Field
                              type="text"
                              name="aadharNo"
                              className="w-full p-2 border border-gray-300 rounded-md mb-2"
                            />
                          </div>
                        </div>
                      )}

                      {step === 2 && (
                        <div>
                          <h3 className="text-xl font-bold mb-4">
                            Step 2: Passport Details
                          </h3>
                          <div className="form-group">
                            <label>Passport Issue Date</label>
                            <Field
                              type="date"
                              name="passportIssueDate"
                              className="w-full p-2 border border-gray-300 rounded-md mb-2"
                            />
                          </div>
                          <div className="form-group">
                            <label>Passport Expiry Date</label>
                            <Field
                              type="date"
                              name="passportExpiryDate"
                              className="w-full p-2 border border-gray-300 rounded-md mb-2"
                            />
                          </div>
                        </div>
                      )}

                      {step === 3 && (
                        <div>
                          <h3 className="text-xl font-bold mb-4">
                            Step 3: Additional Details
                          </h3>
                          <div className="form-group">
                            <label>Date of Birth</label>
                            <Field
                              type="date"
                              name="dob"
                              className="w-full p-2 border border-gray-300 rounded-md mb-2"
                            />
                          </div>
                          <div className="form-group">
                            <label>Place of Birth</label>
                            <Field
                              type="text"
                              name="placeOfBirth"
                              className="w-full p-2 border border-gray-300 rounded-md mb-2"
                            />
                          </div>
                          <div className="form-group">
                            <label>Country of Birth</label>
                            <Field
                              type="text"
                              name="countryOfBirth"
                              className="w-full p-2 border border-gray-300 rounded-md mb-2"
                            />
                          </div>
                          <div className="form-group">
                            <label>Mobile Number</label>
                            <Field
                              type="text"
                              name="mobileNumber"
                              className="w-full p-2 border border-gray-300 rounded-md mb-2"
                            />
                          </div>
                          <div className="form-group">
                            <label>Email ID</label>
                            <Field
                              type="email"
                              name="emailId"
                              className="w-full p-2 border border-gray-300 rounded-md mb-2"
                            />
                          </div>
                        </div>
                      )}

                      {step === 4 && (
                        <div>
                          <h3 className="text-xl font-bold mb-4">
                            Step 4: Confirm Traveller Details
                          </h3>
                          <button
                            type="submit"
                            className="bg-green-500 text-white p-2 rounded-md mt-4 hover:bg-green-700"
                          >
                            Confirm Traveller Details
                          </button>
                        </div>
                      )}

                      <div className="form-buttons">
                        {step > 1 && (
                          <button
                            type="button"
                            onClick={handlePrevious}
                            className="previous-btn"
                          >
                            Previous
                          </button>
                        )}
                        {step < 4 ? (
                          <button
                            type="button"
                            onClick={handleNext}
                            className="next-btn"
                          >
                            Next
                          </button>
                        ) : (
                          <button type="submit" className="submit-btn">
                            Submit
                          </button>
                        )}
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          ) : isTravellerDetailsConfirmed && !isDocumentsUploaded ? (
            <div>
              <h3 className="text-xl font-bold mb-4">
                Step 5: Upload Document
              </h3>
              <input
                type="file"
                onChange={(e) => handleDocumentUpload(e.target.files[0])}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {uploadedDocument && (
                <div className="mt-4 relative">
                  <img
                    src={URL.createObjectURL(uploadedDocument)}
                    alt="Uploaded Document"
                    className="w-auto h-48 rounded shadow-md"
                  />
                  <span className="absolute top-0 left-0 bg-green-500 text-white p-1 rounded-bl-md">
                    Document
                  </span>
                  <button
                    className="bg-green-500 text-white p-2 rounded-md mt-4 hover:bg-green-700"
                    onClick={handleConfirmDocument}
                  >
                    Confirm Document
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">
                Your application has been completed successfully!
              </h2>
              <p className="text-xl text-gray-600 mb-4">
                Thank you for completing your visa application.
              </p>
              <button
                className="bg-green-500 text-white p-2 rounded-md hover:bg-green-700"
                onClick={handleProceedToPayment}
              >
                Proceed to Payment
              </button>
            </div>
          )}
        </div>
        <div className="w-1/4">
          <div className="bg-gray-100 p-4 rounded-md shadow-md">
            <h3 className="text-xl font-bold mb-4">Progress</h3>
            <div className="relative">
              <div className="absolute inset-y-1 left-9 w-1 bg-gray-300"></div>
              <div className="flex flex-col gap-4">
                <div
                  className={`relative flex items-center ${
                    step >= 2
                      ? 'bg-green-100 text-green-500'
                      : 'bg-gray-100 text-gray-500'
                  } p-4 border border-gray-300 rounded-md hover:bg-green-200 transition-colors duration-300`}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-300 bg-white">
                    {step >= 2 ? <i className="fas fa-check"></i> : '1'}
                  </div>
                  <span className="ml-4 font-medium text-lg">Select Date</span>
                </div>
                <div
                  className={`relative flex items-center ${
                    step >= 3
                      ? 'bg-blue-100 text-blue-500'
                      : 'bg-gray-100 text-gray-500'
                  } p-4 border border-gray-300 rounded-md hover:bg-blue-200 transition-colors duration-300 `}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-300 bg-white">
                    {step >= 3 ? <i className="fas fa-check"></i> : '2'}
                  </div>
                  <span className="ml-4 font-medium text-lg">
                    Upload Picture
                  </span>
                </div>
                <div
                  className={`relative flex items-center ${
                    step >= 4
                      ? 'bg-yellow-100 text-yellow-500'
                      : 'bg-gray-100 text-gray-500'
                  } p-4 border border-gray-300 rounded-md hover:bg-yellow-200 transition-colors duration-300`}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-300 bg-white">
                    {step >= 4 ? <i className="fas fa-check"></i> : '3'}
                  </div>
                  <span className="ml-4 font-medium text-lg">
                    Upload Passport
                  </span>
                </div>
                <div
                  className={`relative flex items-center ${
                    step >= 5
                      ? 'bg-purple-100 text-purple-500'
                      : 'bg-gray-100 text-gray-500'
                  } p-4 border border-gray-300 rounded-md hover:bg-purple-200 transition-colors duration-300`}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-300 bg-white">
                    {step >= 5 ? <i className="fas fa-check"></i> : '4'}
                  </div>
                  <span className="ml-4 font-medium text-lg">
                    Traveller Details
                  </span>
                </div>
                <div
                  className={`relative flex items-center ${
                    step >= 6
                      ? 'bg-red-100 text-red-500'
                      : 'bg-gray-100 text-gray-500'
                  } p-4 border border-gray-300 rounded-md hover:bg-red-200 transition-colors duration-300`}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-300 bg-white">
                    {step >= 6 ? <i className="fas fa-check"></i> : '5'}
                  </div>
                  <span className="ml-4 font-medium text-lg">
                    Upload Documents
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisaApplication;