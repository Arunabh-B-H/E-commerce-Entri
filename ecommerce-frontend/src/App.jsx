import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Shipping = lazy(() => import('./pages/Shipping'));
const PaymentMethod = lazy(() => import('./pages/PaymentMethod'));
const PlaceOrder = lazy(() => import('./pages/PlaceOrder'));
const Order = lazy(() => import('./pages/Order'));

const PageTransition = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="w-full h-full flex flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

function AppContent() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <Navbar />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProductDetail />
            </Suspense>
          } />
          <Route path="/cart" element={
            <Suspense fallback={<div>Loading...</div>}>
              <Cart />
            </Suspense>
          } />
          <Route path="/shipping" element={
            <Suspense fallback={<div>Loading...</div>}>
              <Shipping />
            </Suspense>
          } />
          <Route path="/payment" element={
            <Suspense fallback={<div>Loading...</div>}>
              <PaymentMethod />
            </Suspense>
          } />
          <Route path="/placeorder" element={
            <Suspense fallback={<div>Loading...</div>}>
              <PlaceOrder />
            </Suspense>
          } />
          <Route path="/order/:id" element={
            <Suspense fallback={<div>Loading...</div>}>
              <Order />
            </Suspense>
          } />
          </Routes>
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
