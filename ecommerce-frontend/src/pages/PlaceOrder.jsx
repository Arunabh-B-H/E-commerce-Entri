import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCartItems } from '../redux/slices/cartSlice';
import API from '../api/axiosInstance';
import { FaMapMarkerAlt, FaCreditCard, FaBoxOpen } from 'react-icons/fa';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await API.post('/orders', {
        orderItems: cart.cartItems.map((item) => ({
          ...item,
          product: item._id,
        })),
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      });

      dispatch(clearCartItems());
      navigate(`/order/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12">
      <div className="mb-12 flex items-center justify-between relative max-w-2xl mx-auto">
        <div className="absolute left-0 top-1/2 w-full h-0.5 bg-gray-200 -z-10"></div>
        <div className="absolute left-0 top-1/2 w-full h-0.5 bg-gold-500 -z-10"></div>
        <div className="bg-gold-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</div>
        <div className="bg-gold-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</div>
        <div className="bg-gold-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
          
          <div className="bg-dark-900 p-8 rounded-2xl border border-dark-700 shadow-sm flex items-start gap-6">
            <div className="w-12 h-12 bg-gold-500/10 text-gold-500 rounded-full flex items-center justify-center text-xl shrink-0">
              <FaMapMarkerAlt />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Shipping Address</h2>
              <p className="text-gray-400 leading-relaxed">
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
              </p>
            </div>
          </div>

          <div className="bg-dark-900 p-8 rounded-2xl border border-dark-700 shadow-sm flex items-start gap-6">
            <div className="w-12 h-12 bg-gold-500/10 text-gold-500 rounded-full flex items-center justify-center text-xl shrink-0">
              <FaCreditCard />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Payment Method</h2>
              <p className="text-gray-400 font-medium">Method: <span className="text-white font-bold">{cart.paymentMethod}</span></p>
            </div>
          </div>

          <div className="bg-dark-900 p-8 rounded-2xl border border-dark-700 shadow-sm">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-12 h-12 bg-gold-500/10 text-gold-500 rounded-full flex items-center justify-center text-xl shrink-0">
                <FaBoxOpen />
              </div>
              <h2 className="text-xl font-bold text-white">Order Items</h2>
            </div>
            
            {cart.cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {cart.cartItems.map((item, index) => (
                  <li key={index} className="py-4 flex items-center gap-6">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
                    <Link to={`/product/${item._id}`} className="flex-1 font-bold text-white hover:text-gold-500">
                      {item.name}
                    </Link>
                    <div className="font-medium text-gray-400">
                      {item.qty} x ₹{item.price.toLocaleString('en-IN')} = <span className="font-bold text-white">₹{(item.qty * item.price).toLocaleString('en-IN')}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6 pb-4 border-b border-dark-700">Order Summary</h2>
            
            <div className="flex justify-between items-center mb-4 text-gray-400">
              <span>Items</span>
              <span className="font-medium">₹{Number(cart.itemsPrice).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center mb-4 text-gray-400">
              <span>Shipping</span>
              <span className="font-medium">{cart.shippingPrice === '0.00' ? 'Free' : `₹${cart.shippingPrice}`}</span>
            </div>
            <div className="flex justify-between items-center mb-6 text-gray-400 pb-6 border-b border-dark-700">
              <span>Tax</span>
              <span className="font-medium">₹{Number(cart.taxPrice).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-bold text-white">Total</span>
              <span className="text-2xl font-black text-gold-500">₹{Number(cart.totalPrice).toLocaleString('en-IN')}</span>
            </div>

            {error && <div className="bg-dark-800 text-red-600 p-4 rounded-lg mb-6 text-sm font-medium">{error}</div>}

            <button
              onClick={placeOrderHandler}
              disabled={cart.cartItems.length === 0 || loading}
              className="w-full bg-gold-500 hover:bg-gold-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
