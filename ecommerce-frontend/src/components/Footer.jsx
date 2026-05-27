import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand & Intro */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-2xl font-black tracking-tighter text-white flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xl">
                T
              </div>
              TECHSTORE.
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Your ultimate destination for premium electronics and professional gear. We curate the best technology to elevate your digital lifestyle.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition">
                <FaFacebookF />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-400 hover:text-white transition">
                <FaTwitter />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="#" className="hover:text-blue-500 transition">Laptops & PCs</Link></li>
              <li><Link to="#" className="hover:text-blue-500 transition">Smartphones</Link></li>
              <li><Link to="#" className="hover:text-blue-500 transition">Audio & Video</Link></li>
              <li><Link to="#" className="hover:text-blue-500 transition">Gaming Consoles</Link></li>
              <li><Link to="#" className="hover:text-blue-500 transition">Accessories</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Support</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="#" className="hover:text-blue-500 transition">Contact Us</Link></li>
              <li><Link to="#" className="hover:text-blue-500 transition">Order Status</Link></li>
              <li><Link to="#" className="hover:text-blue-500 transition">Shipping & Returns</Link></li>
              <li><Link to="#" className="hover:text-blue-500 transition">FAQ</Link></li>
              <li><Link to="#" className="hover:text-blue-500 transition">Warranty Info</Link></li>
            </ul>
          </div>

          {/* Links 3 */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="#" className="hover:text-blue-500 transition">About Us</Link></li>
              <li><Link to="#" className="hover:text-blue-500 transition">Careers</Link></li>
              <li><Link to="#" className="hover:text-blue-500 transition">Blog</Link></li>
              <li><Link to="#" className="hover:text-blue-500 transition">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-blue-500 transition">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} TechStore. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <span className="flex items-center gap-1">Secure payments via Stripe</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
