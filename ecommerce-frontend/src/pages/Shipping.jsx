import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../redux/slices/cartSlice';

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="mb-8 flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 w-full h-0.5 bg-gray-200 -z-10"></div>
        <div className="absolute left-0 top-1/2 w-1/3 h-0.5 bg-gold-500 -z-10"></div>
        <div className="bg-gold-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</div>
        <div className="bg-gray-200 text-gray-400 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</div>
        <div className="bg-gray-200 text-gray-400 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</div>
      </div>

      <div className="bg-dark-900 p-8 rounded-2xl border border-dark-700 shadow-sm">
        <h1 className="text-3xl font-black text-white mb-6">Shipping Address</h1>
        
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Address</label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="block w-full p-3 border border-dark-700 rounded-lg focus:ring-2 focus:ring-gold-500 transition text-sm bg-dark-800 focus:bg-dark-900"
              placeholder="123 Main St, Apt 4B"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">City</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="block w-full p-3 border border-dark-700 rounded-lg focus:ring-2 focus:ring-gold-500 transition text-sm bg-dark-800 focus:bg-dark-900"
                placeholder="New York"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Postal Code</label>
              <input
                type="text"
                required
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="block w-full p-3 border border-dark-700 rounded-lg focus:ring-2 focus:ring-gold-500 transition text-sm bg-dark-800 focus:bg-dark-900"
                placeholder="10001"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Country</label>
            <input
              type="text"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="block w-full p-3 border border-dark-700 rounded-lg focus:ring-2 focus:ring-gold-500 transition text-sm bg-dark-800 focus:bg-dark-900"
              placeholder="United States"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-black text-white py-4 rounded-lg hover:bg-gold-500 transition font-bold tracking-wide mt-8"
          >
            Continue to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
