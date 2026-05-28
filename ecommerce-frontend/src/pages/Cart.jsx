import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';
import { FaTrash, FaArrowRight } from 'react-icons/fa';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/shipping');
  };

  return (
    <div className="max-w-7xl mx-auto py-8">
      <h1 className="text-3xl font-black text-gray-900 mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center">
          <p className="text-gray-500 mb-4">Your cart is empty.</p>
          <Link to="/" className="inline-block bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <ul className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <li key={item._id} className="p-6 flex flex-col sm:flex-row items-center gap-6">
                    <img src={item.image} alt={item.name} className="w-24 h-24 object-contain" />
                    <div className="flex-1 text-center sm:text-left">
                      <Link to={`/product/${item._id}`} className="font-bold text-gray-900 hover:text-blue-600 transition text-lg">
                        {item.name}
                      </Link>
                      <div className="text-sm text-gray-500 mt-1">{item.brand}</div>
                    </div>
                    <div className="text-xl font-black text-gray-900">₹{item.price.toLocaleString('en-IN')}</div>
                    
                    <div className="flex items-center gap-4 mt-4 sm:mt-0">
                      <select
                        value={item.qty}
                        onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                        className="bg-gray-50 border border-gray-200 text-gray-900 rounded-lg p-2 font-bold focus:ring-blue-500"
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                      <button 
                        onClick={() => removeFromCartHandler(item._id)}
                        className="text-red-500 hover:text-red-700 transition p-2 bg-red-50 hover:bg-red-100 rounded-lg"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Order Summary</h2>
              
              <div className="flex justify-between items-center mb-4 text-gray-600">
                <span>Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</span>
                <span className="font-medium">₹{Number(itemsPrice).toLocaleString('en-IN')}</span>
              </div>
              
              <div className="flex justify-between items-center mb-4 text-gray-600">
                <span>Shipping</span>
                <span className="font-medium">{shippingPrice === '0.00' ? 'Free' : `₹${shippingPrice}`}</span>
              </div>
              
              <div className="flex justify-between items-center mb-6 text-gray-600 pb-6 border-b border-gray-100">
                <span>Estimated Tax</span>
                <span className="font-medium">₹{Number(taxPrice).toLocaleString('en-IN')}</span>
              </div>
              
              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-black text-blue-600">₹{Number(totalPrice).toLocaleString('en-IN')}</span>
              </div>

              <button
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3"
              >
                Proceed to Checkout <FaArrowRight />
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;
