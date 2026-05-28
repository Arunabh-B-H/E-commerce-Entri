import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api/axiosInstance';
import { FaCheckCircle, FaSpinner } from 'react-icons/fa';

const Order = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  const fetchOrder = async () => {
    try {
      const { data } = await API.get(`/orders/${id}`);
      setOrder(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const handlePayment = async () => {
    setPaying(true);
    // Simulate payment gateway processing delay
    setTimeout(async () => {
      try {
        await API.put(`/orders/${id}/pay`, {
          id: `MOCK_${order.paymentMethod.toUpperCase()}_ID_${Math.random().toString(36).substr(2, 9)}`,
          status: 'COMPLETED',
          email_address: order.user?.email || 'test@example.com'
        });
        fetchOrder();
      } catch (err) {
        console.error(err);
      } finally {
        setPaying(false);
      }
    }, 2000);
  };

  if (loading) return <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500"></div></div>;

  return (
    <div className="max-w-7xl mx-auto py-12">
      <h1 className="text-3xl font-black text-white mb-8">Order <span className="text-gold-500">#{order._id}</span></h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
          
          <div className="bg-dark-900 p-8 rounded-2xl border border-dark-700 shadow-sm">
            <h2 className="text-xl font-bold text-white mb-4">Shipping</h2>
            <p className="mb-4"><strong>Name:</strong> {order.user?.name}</p>
            <p className="mb-4"><strong>Email:</strong> {order.user?.email}</p>
            <p className="mb-6"><strong>Address:</strong> {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}, {order.shippingAddress?.country}</p>
            {order.isDelivered ? (
              <div className="bg-dark-800 text-green-700 p-4 rounded-lg font-bold">Delivered on {order.deliveredAt}</div>
            ) : (
              <div className="bg-dark-800 text-red-600 p-4 rounded-lg font-bold">Not Delivered</div>
            )}
          </div>

          <div className="bg-dark-900 p-8 rounded-2xl border border-dark-700 shadow-sm">
            <h2 className="text-xl font-bold text-white mb-4">Payment Method</h2>
            <p className="mb-6"><strong>Method:</strong> {order.paymentMethod}</p>
            {order.isPaid ? (
              <div className="bg-dark-800 text-green-700 p-4 rounded-lg font-bold flex items-center gap-2">
                <FaCheckCircle /> Paid on {new Date(order.paidAt).toLocaleDateString()}
              </div>
            ) : (
              <div className="bg-dark-800 text-red-600 p-4 rounded-lg font-bold">Not Paid</div>
            )}
          </div>

          <div className="bg-dark-900 p-8 rounded-2xl border border-dark-700 shadow-sm">
            <h2 className="text-xl font-bold text-white mb-6">Order Items</h2>
            <ul className="divide-y divide-gray-100">
              {order.orderItems?.map((item, index) => (
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
          </div>

        </div>

        <div className="lg:col-span-4">
          <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6 pb-4 border-b border-dark-700">Order Summary</h2>
            
            <div className="flex justify-between items-center mb-4 text-gray-400">
              <span>Items</span>
              <span className="font-medium">₹{Number(order.itemsPrice).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center mb-4 text-gray-400">
              <span>Shipping</span>
              <span className="font-medium">₹{Number(order.shippingPrice).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center mb-6 text-gray-400 pb-6 border-b border-dark-700">
              <span>Tax</span>
              <span className="font-medium">₹{Number(order.taxPrice).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-bold text-white">Total</span>
              <span className="text-2xl font-black text-gold-500">₹{Number(order.totalPrice).toLocaleString('en-IN')}</span>
            </div>

            {!order.isPaid && (
              <div className="mt-8 border-t border-dark-700 pt-6">
                <div className="bg-gold-500/10 border border-gold-500/20 p-4 rounded-xl mb-6">
                  <p className="text-sm text-gold-400 font-medium mb-4 text-center">
                    This is a mocked <strong>{order.paymentMethod}</strong> gateway for demonstration purposes.
                  </p>
                  {order.paymentMethod === 'UPI' && (
                    <div className="flex justify-center mb-4">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="UPI QR" className="w-32 h-32 opacity-50" />
                    </div>
                  )}
                  <button
                    onClick={handlePayment}
                    disabled={paying}
                    className="w-full bg-gold-500 hover:bg-gold-600 text-white font-bold py-4 rounded-lg shadow-lg transition-all flex justify-center items-center gap-2"
                  >
                    {paying ? <FaSpinner className="animate-spin" /> : `Simulate ${order.paymentMethod} Payment`}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
