import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white py-4 text-center">
          <p>&copy; 2026 TechStore. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
