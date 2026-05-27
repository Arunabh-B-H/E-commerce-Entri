import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold tracking-wider">
              TECHSTORE
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="flex items-center space-x-1 hover:text-gray-300">
              <FaShoppingCart />
              <span>Cart</span>
            </Link>
            <Link to="/login" className="flex items-center space-x-1 hover:text-gray-300">
              <FaUser />
              <span>Login</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
