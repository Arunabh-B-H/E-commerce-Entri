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

  if (loading) return <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div></div>;

  return (
    <div className="max-w-7xl mx-auto py-12">
      <h1 className="text-3xl font-black text-gray-900 mb-8">Order <span className="text-blue-600">#{order._id}</span></h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
          
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Shipping</h2>
            <p className="mb-4"><strong>Name:</strong> {order.user?.name}</p>
            <p className="mb-4"><strong>Email:</strong> {order.user?.email}</p>
            <p className="mb-6"><strong>Address:</strong> {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}, {order.shippingAddress?.country}</p>
            {order.isDelivered ? (
              <div className="bg-green-50 text-green-700 p-4 rounded-lg font-bold">Delivered on {order.deliveredAt}</div>
            ) : (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg font-bold">Not Delivered</div>
            )}
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h2>
            <p className="mb-6"><strong>Method:</strong> {order.paymentMethod}</p>
            {order.isPaid ? (
              <div className="bg-green-50 text-green-700 p-4 rounded-lg font-bold flex items-center gap-2">
                <FaCheckCircle /> Paid on {new Date(order.paidAt).toLocaleDateString()}
              </div>
            ) : (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg font-bold">Not Paid</div>
            )}
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Items</h2>
            <ul className="divide-y divide-gray-100">
              {order.orderItems?.map((item, index) => (
                <li key={index} className="py-4 flex items-center gap-6">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
                  <Link to={`/product/${item._id}`} className="flex-1 font-bold text-gray-900 hover:text-blue-600">
                    {item.name}
                  </Link>
                  <div className="font-medium text-gray-600">
                    {item.qty} x ₹{item.price.toLocaleString('en-IN')} = <span className="font-bold text-gray-900">₹{(item.qty * item.price).toLocaleString('en-IN')}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="lg:col-span-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Order Summary</h2>
            
            <div className="flex justify-between items-center mb-4 text-gray-600">
              <span>Items</span>
              <span className="font-medium">₹{Number(order.itemsPrice).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center mb-4 text-gray-600">
              <span>Shipping</span>
              <span className="font-medium">₹{Number(order.shippingPrice).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center mb-6 text-gray-600 pb-6 border-b border-gray-100">
              <span>Tax</span>
              <span className="font-medium">₹{Number(order.taxPrice).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-2xl font-black text-blue-600">₹{Number(order.totalPrice).toLocaleString('en-IN')}</span>
            </div>

            {!order.isPaid && (
              <div className="mt-8 border-t border-gray-200 pt-6">
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl mb-6">
                  <p className="text-sm text-blue-800 font-medium mb-4 text-center">
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
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg shadow-lg transition-all flex justify-center items-center gap-2"
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
