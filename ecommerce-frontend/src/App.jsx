import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">E-Commerce Store</h1>
          </div>
        </header>
        <main className="flex-grow max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<h2 className="text-xl">Welcome to our store!</h2>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
