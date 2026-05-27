import React from 'react';

const Home = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Latest Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* We will map products here */}
        <div className="p-4 border rounded shadow-sm hover:shadow-md transition">
          <div className="h-48 bg-gray-200 mb-4 flex items-center justify-center text-gray-500">
            Image Placeholder
          </div>
          <h3 className="font-semibold text-lg">Sample Product</h3>
          <p className="text-gray-600 mt-2">$99.99</p>
          <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
