import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import API from '../api/axiosInstance';
import { motion } from 'framer-motion';
import { FaStar, FaShoppingCart } from 'react-icons/fa';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryFilter = searchParams.get('category');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get('/products');
        if (categoryFilter) {
          setProducts(data.filter(p => p.category === categoryFilter));
        } else {
          setProducts(data);
        }
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryFilter]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500"></div>
      </div>
    );
  }

  return (
    <div>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-center sm:text-left"
      >
        <h2 className="text-3xl font-black text-white tracking-tight">
          {categoryFilter ? `${categoryFilter}` : 'Featured Products'}
        </h2>
        <Link to="/" className="text-gold-500 font-bold hover:underline">
          {categoryFilter ? 'Clear Filter' : 'View All'}
        </Link>
      </motion.div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {products.map((product, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-dark-900 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-dark-700 flex flex-col"
          >
            <Link to={`/product/${product._id || product.id}`} className="h-56 bg-dark-800 flex items-center justify-center p-4 overflow-hidden group">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                src={product.image} 
                alt={product.name} 
                className="max-h-full object-contain brightness-110 drop-shadow-2xl" 
              />
            </Link>
            
            <div className="p-5 flex flex-col flex-grow">
              <div className="text-xs text-gold-500 font-semibold uppercase tracking-wider mb-2">
                {product.brand}
              </div>
              <Link to={`/product/${product._id || product.id}`}>
                <h3 className="font-bold text-gray-100 text-lg leading-tight mb-2 line-clamp-2 hover:text-gold-500 transition">
                  {product.name}
                </h3>
              </Link>
              
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'} />
                  ))}
                </div>
                <span className="text-gray-400 text-xs ml-2">({product.numReviews})</span>
              </div>
              
              <div className="mt-auto flex items-center justify-between">
                <span className="text-xl font-black text-white">₹{product.price.toLocaleString('en-IN')}</span>
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className="bg-black text-white p-3 rounded-full hover:bg-gold-500 transition-colors shadow-md"
                  title="Add to cart"
                >
                  <FaShoppingCart />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Home;
