import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-dark-900 sticky top-0 z-50 border-b border-dark-700 shadow-sm">
      {/* Top mini-bar */}
      <div className="bg-black text-white text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex justify-between">
          <span className="hidden sm:inline">Free shipping on all orders over rs.2000 </span>
          <span className="sm:hidden">Free shipping over rs.2000</span>
          <div className="flex gap-4">
            <Link to="/support" className="hover:text-gray-300">Support</Link>
            <Link to="/track" className="hover:text-gray-300">Track Order</Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-black tracking-tighter text-white flex items-center gap-2">
              <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center text-white text-xl">
                T
              </div>
              TECHSTORE.
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8 relative group">
            <input
              type="text"
              placeholder="Search for premium gear..."
              className="w-full bg-dark-800 border border-dark-700 text-white text-sm rounded-full py-3 px-6 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-dark-900 transition-all duration-300"
            />
            <button className="absolute right-2 top-1.5 bg-gold-500 hover:bg-gold-600 text-white p-2 rounded-full transition">
              <FaSearch />
            </button>
          </div>

          {/* Icons & User */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/cart" className="relative text-gray-400 hover:text-gold-500 transition flex flex-col items-center group">
              <FaShoppingCart className="text-xl mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] uppercase font-bold tracking-widest">Cart</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              )}
            </Link>

            {userInfo ? (
              <div className="relative group cursor-pointer">
                <div className="flex items-center gap-2 text-gray-400 hover:text-gold-500 transition">
                  {userInfo.avatar ? (
                    <img src={userInfo.avatar} alt="Avatar" className="w-8 h-8 rounded-full border border-dark-700" />
                  ) : (
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 font-bold">
                      {userInfo.name.charAt(0)}
                    </div>
                  )}
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Account</span>
                    <span className="text-sm font-semibold truncate max-w-[100px]">{userInfo.name.split(' ')[0]}</span>
                  </div>
                </div>

                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-dark-900 rounded-xl shadow-xl border border-dark-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100">
                  <div className="p-2">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-dark-800 hover:text-gold-500 rounded-lg transition">Profile</Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm text-gray-300 hover:bg-dark-800 hover:text-gold-500 rounded-lg transition">Orders</Link>
                    <div className="h-px bg-dark-700 my-1"></div>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-dark-800 rounded-lg transition">Logout</button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-2 text-gray-400 hover:text-gold-500 transition group">
                <div className="w-8 h-8 bg-dark-700 rounded-full flex items-center justify-center group-hover:bg-gold-500/10 transition">
                  <FaUser className="text-sm" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Sign In</span>
                  <span className="text-sm font-semibold">Account</span>
                </div>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-gold-500 text-2xl">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="hidden md:block bg-dark-800 border-t border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex space-x-8 text-sm font-medium text-gray-400 py-3">
            <li><Link to="/" className="hover:text-gold-500 transition">All Categories</Link></li>
            <li><Link to="/?category=Laptops & PCs" className="hover:text-gold-500 transition">Laptops & PCs</Link></li>
            <li><Link to="/?category=Smartphones" className="hover:text-gold-500 transition">Smartphones</Link></li>
            <li><Link to="/?category=Audio & Headphones" className="hover:text-gold-500 transition">Audio & Headphones</Link></li>
            <li><Link to="/?category=Gaming" className="hover:text-gold-500 transition">Gaming</Link></li>
            <li><Link to="/?category=Accessories" className="hover:text-gold-500 transition">Accessories</Link></li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-dark-900 border-t border-dark-700 shadow-xl absolute w-full">
          <div className="p-4 space-y-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-dark-800 border border-dark-700 text-white text-sm rounded-full py-3 px-4 focus:outline-none"
            />
            {userInfo ? (
              <div className="space-y-2 pt-2 border-t border-dark-700">
                <p className="px-2 text-sm text-gray-400">Welcome, {userInfo.name}</p>
                <Link to="/profile" onClick={() => setIsOpen(false)} className="block px-2 py-2 text-gray-300 font-medium">Profile</Link>
                <button onClick={handleLogout} className="block w-full text-left px-2 py-2 text-red-600 font-medium">Logout</button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)} className="block px-2 py-2 text-gold-500 font-medium border-t border-dark-700 pt-4">Sign In / Register</Link>
            )}
            <div className="border-t border-dark-700 pt-2">
              <Link to="/cart" onClick={() => setIsOpen(false)} className="block px-2 py-2 text-gray-300 font-medium flex items-center justify-between">
                Cart
                {cartItems.length > 0 && (
                  <span className="bg-gold-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
