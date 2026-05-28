import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../api/axiosInstance';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { FaStar, FaArrowLeft, FaShoppingCart } from 'react-icons/fa';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
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
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto py-8">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium mb-8 transition">
        <FaArrowLeft /> Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
        
        {/* Product Image */}
        <div className="lg:col-span-5 bg-white p-8 rounded-2xl border border-gray-100 flex items-center justify-center">
          <img src={product.image} alt={product.name} className="w-full h-auto object-contain max-h-[500px]" />
        </div>

        {/* Product Info */}
        <div className="lg:col-span-4 flex flex-col justify-center">
          <div className="text-sm text-blue-600 font-bold tracking-widest uppercase mb-2">
            {product.brand}
          </div>
          <h1 className="text-4xl font-black text-gray-900 leading-tight mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < Math.floor(product.rating || 5) ? 'text-yellow-400' : 'text-gray-200'} />
              ))}
            </div>
            <span className="text-gray-500 text-sm font-medium">{product.numReviews} Reviews</span>
          </div>
          
          <p className="text-gray-600 leading-relaxed mb-6">
            {product.description}
          </p>
        </div>

        {/* Checkout Card */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-24">
            <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Price</span>
              <span className="text-3xl font-black text-gray-900">${product.price}</span>
            </div>
            
            <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Status</span>
              <span className={`font-bold ${product.countInStock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
              </span>
            </div>

            {product.countInStock > 0 && (
              <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-100">
                <span className="text-gray-500 font-medium">Qty</span>
                <select 
                  value={qty} 
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 font-bold"
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
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
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
