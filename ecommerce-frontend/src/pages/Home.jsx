import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axiosInstance';
import { motion } from 'framer-motion';
import { FaStar, FaShoppingCart } from 'react-icons/fa';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get('/products');
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
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
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Featured Collection</h2>
        <p className="text-gray-500 mt-2">Discover our premium range of electronics and accessories.</p>
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
            className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
          >
            <Link to={`/product/${product._id || product.id}`} className="h-56 bg-gray-50 flex items-center justify-center p-4 overflow-hidden group">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                src={product.image} 
                alt={product.name} 
                className="max-h-full object-contain mix-blend-multiply" 
              />
            </Link>
            
            <div className="p-5 flex flex-col flex-grow">
              <div className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-2">
                {product.brand}
              </div>
              <Link to={`/product/${product._id || product.id}`}>
                <h3 className="font-bold text-gray-800 text-lg leading-tight mb-2 line-clamp-2 hover:text-blue-600 transition">
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
                <span className="text-xl font-extrabold text-gray-900">${product.price}</span>
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-900 text-white p-3 rounded-full hover:bg-blue-600 transition-colors shadow-md"
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
