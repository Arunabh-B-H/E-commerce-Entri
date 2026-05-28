import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../redux/slices/cartSlice';

const PaymentMethod = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!shippingAddress.address) {
    navigate('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('Stripe');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="mb-8 flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 w-full h-0.5 bg-gray-200 -z-10"></div>
        <div className="absolute left-0 top-1/2 w-2/3 h-0.5 bg-blue-600 -z-10"></div>
        <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</div>
        <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</div>
        <div className="bg-gray-200 text-gray-500 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</div>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h1 className="text-3xl font-black text-gray-900 mb-6">Payment Method</h1>
        
        <form onSubmit={submitHandler}>
          <div className="space-y-4 mb-8">
            <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-blue-600 transition has-[:checked]:border-blue-600 has-[:checked]:ring-1 has-[:checked]:ring-blue-600">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Stripe"
                  checked={paymentMethod === 'Stripe'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                />
                <span className="font-bold text-gray-900">Credit Card (Stripe)</span>
              </div>
              <div className="flex gap-2">
                <span className="bg-gray-100 px-2 py-1 rounded text-xs font-bold text-gray-600">VISA</span>
                <span className="bg-gray-100 px-2 py-1 rounded text-xs font-bold text-gray-600">MC</span>
              </div>
            </label>

            <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-blue-600 transition has-[:checked]:border-blue-600 has-[:checked]:ring-1 has-[:checked]:ring-blue-600">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="UPI"
                  checked={paymentMethod === 'UPI'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                />
                <span className="font-bold text-gray-900">UPI (GPay, PhonePe, Paytm)</span>
              </div>
              <div className="flex gap-2">
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Fast</span>
              </div>
            </label>
          </div>

          <button 
            type="submit" 
            className="w-full bg-gray-900 text-white py-4 rounded-lg hover:bg-blue-600 transition font-bold tracking-wide"
          >
            Review Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentMethod;
