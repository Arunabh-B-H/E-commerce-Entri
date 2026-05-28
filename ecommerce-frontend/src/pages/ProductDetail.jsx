import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../api/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { FaStar, FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    if (!userInfo) {
      navigate('/register');
      return;
    }
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto py-8">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-gold-500 font-medium mb-8 transition">
        <FaArrowLeft /> Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
        
        {/* Product Image */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-5 bg-dark-900 p-8 rounded-2xl border border-dark-700 flex items-center justify-center shadow-sm"
        >
          <img src={product.image} alt={product.name} className="w-full h-auto object-contain max-h-[500px]" />
        </motion.div>

        {/* Product Info */}
        <div className="lg:col-span-4 flex flex-col justify-center">
          <div className="text-sm text-gold-500 font-bold tracking-widest uppercase mb-2">
            {product.brand}
          </div>
          <h1 className="text-4xl font-black text-white leading-tight mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-dark-700">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < Math.floor(product.rating || 5) ? 'text-yellow-400' : 'text-gray-200'} />
              ))}
            </div>
            <span className="text-gray-400 text-sm font-medium">{product.numReviews} Reviews</span>
          </div>
          
          <p className="text-gray-400 leading-relaxed mb-6">
            {product.description}
          </p>
        </div>

        {/* Checkout Card */}
        <div className="lg:col-span-3">
          <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 shadow-sm sticky top-24">
            <div className="flex justify-between items-center mb-6 pb-6 border-b border-dark-700">
              <span className="text-gray-400 font-medium">Price</span>
              <span className="text-3xl font-black text-white">₹{product.price?.toLocaleString('en-IN')}</span>
            </div>
            
            <div className="flex justify-between items-center mb-6 pb-6 border-b border-dark-700">
              <span className="text-gray-400 font-medium">Status</span>
              <span className={`font-bold ${product.countInStock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
              </span>
            </div>

            {product.countInStock > 0 && (
              <div className="flex justify-between items-center mb-8 pb-6 border-b border-dark-700">
                <span className="text-gray-400 font-medium">Qty</span>
                <select 
                  value={qty} 
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="bg-dark-800 border border-dark-700 text-white rounded-lg focus:ring-gold-500 focus:border-gold-500 block p-2.5 font-bold"
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
              className="w-full bg-gold-500 hover:bg-gold-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-gold-500/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaShoppingCart /> Add To Cart
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;
