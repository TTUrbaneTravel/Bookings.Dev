import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import checkout from '../assets/checkout.jpg';

const Checkout = () => {
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState({
    delivery: 'delivery',
    fullName: '',
    email: '',
    phoneNumber: '',
    country: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'DuoComfort Sofa Premium', price: 20, quantity: 1 },
    { id: '2', name: 'IronOne Desk', price: 25, quantity: 1 },
  ]);

  const handleShippingChange = (e) => {
    setShippingInfo((prevInfo) => ({
      ...prevInfo,
      [e.target.name]: e.target.value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleCartChange = (item) => {
    setCartItems((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.id === item.id
          ? { ...prevItem, quantity: prevItem.quantity + 1 }
          : prevItem,
      ),
    );
  };

  const handleProceedToPayment = () => {
    navigate('/payment');
  };

  const handleDiscount = (e) => {
    const enteredCode = e.target.value;
    if (enteredCode === 'DISCOUNT10') {
      setCartItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          price: item.price - 10,
        })),
      );
    }
  };

  return (
    <div className="bg-white pt-28 p-4 animate-fade-in">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <div className="w-1/2">
            <h2 className="font-bold mb-4">Shipping Information</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Delivery
              </label>
              <input
                type="radio"
                name="delivery"
                value="delivery"
                checked={shippingInfo.delivery === 'delivery'}
                onChange={handleShippingChange}
                className="ml-2 mr-2"
              />
              <input
                type="radio"
                name="delivery"
                value="pickup"
                checked={shippingInfo.delivery === 'pickup'}
                onChange={handleShippingChange}
                className="ml-2 mr-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Full name
              </label>
              <input
                type="text"
                name="fullName"
                value={shippingInfo.fullName}
                onChange={handleInputChange}
                className="mb-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={shippingInfo.email}
                onChange={handleInputChange}
                className="mb-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={shippingInfo.phoneNumber}
                onChange={handleInputChange}
                className="mb-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Country
              </label>
              <select
                name="country"
                value={shippingInfo.country}
                onChange={handleInputChange}
              >
                <option value="">Choose country</option>
                <option value="usa">USA</option>
                <option value="canada">Canada</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={shippingInfo.city}
                onChange={handleInputChange}
                className="mb-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                State
              </label>
              <input
                type="text"
                name="state"
                value={shippingInfo.state}
                onChange={handleInputChange}
                className="mb-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                ZIP Code
              </label>
              <input
                type="text"
                name="zipCode"
                value={shippingInfo.zipCode}
                onChange={handleInputChange}
                className="mb-2"
              />
            </div>
            <div className="mb-4">
              <input type="checkbox" id="terms" name="terms" />
              <label htmlFor="terms" className="ml-2">
                I have read and agree to the{' '}
                <a href="terms.html" target="_blank" rel="noopener noreferrer">
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>
          <div className="w-1/2">
            <h2 className="font-bold mb-4">Review your cart</h2>
            <div className="mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center mb-2">
                  <img src={checkout} alt={item.name} className="w-10 h-10" />
                  <div className="ml-2">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-500">x{item.quantity}</p>
                    <p className="font-semibold">${item.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Discount code
              </label>
              <input
                type="text"
                placeholder="Enter discount code"
                className="mb-2"
                onChange={handleDiscount}
              />
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded"
                onClick={() => handleCartChange({ id: '2' })}
              >
                Apply
              </button>
            </div>
            <div className="mb-4">
              <p className="text-gray-700">Subtotal</p>
              <p className="font-semibold">
                ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
              </p>
              <p className="text-gray-700">Shipping</p>
              <p className="font-semibold">
                ${cartItems.find((item) => item.id === '2') ? 5 : 0}
              </p>
              <p className="text-gray-700">Discount</p>
              <p className="font-semibold">
                ${cartItems.find((item) => item.id === '2') ? -10 : 0}
              </p>
              <p className="text-gray-700">Total</p>
              <p className="font-semibold">
                $
                {cartItems.reduce((total, item) => total + item.price * item.quantity, 0) -
                  (cartItems.find((item) => item.id === '2') ? 10 : 0)}
              </p>
            </div>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded"
              onClick={handleProceedToPayment}
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;