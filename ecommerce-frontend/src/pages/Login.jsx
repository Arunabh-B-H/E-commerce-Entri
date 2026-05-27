import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../redux/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axiosInstance';
import { GoogleLogin } from '@react-oauth/google';
import { FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      const { data } = await API.post('/auth/google', {
        credential: credentialResponse.credential
      });
      dispatch(setCredentials(data));
      navigate('/');
    } catch (err) {
      setError('Google Sign-In failed.');
      setLoading(false);
    }
  };

  const handleMockGoogleLogin = () => {
    // Generate a fake JWT for assignment demonstration purposes
    const header = btoa(JSON.stringify({ alg: "RS256", typ: "JWT" }));
    const payload = btoa(JSON.stringify({
      email: "demo.user@gmail.com",
      name: "Demo User",
      picture: "https://ui-avatars.com/api/?name=Demo+User&background=0D8ABC&color=fff",
    }));
    const fakeToken = `${header}.${payload}.signature`;
    handleGoogleSuccess({ credential: fakeToken });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await API.post('/auth/login', { email, password });
      dispatch(setCredentials(data));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center -mx-4 sm:-mx-6 lg:-mx-8 -my-8 bg-white">
      <div className="flex w-full max-w-6xl h-[80vh] bg-white overflow-hidden">
        
        {/* Left Side: Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24">
          <div className="max-w-md w-full mx-auto">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Welcome Back</h2>
            <p className="text-gray-500 mb-8">Enter your details to access your account.</p>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 text-sm rounded-r">
                {error}
              </div>
            )}

            <div className="mb-6 flex justify-center w-full">
              <div className="w-full">
                {import.meta.env.VITE_GOOGLE_CLIENT_ID ? (
                  <div className="w-full [&>div]:w-full">
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={() => setError('Google Login Failed')}
                      theme="outline"
                      size="large"
                      width="100%"
                    />
                  </div>
                ) : (
                  <button 
                    onClick={handleMockGoogleLogin}
                    type="button"
                    className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg hover:bg-gray-50 transition font-medium shadow-sm"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                  </button>
                )}
              </div>
            </div>

            <div className="relative flex items-center justify-center mb-6">
              <div className="border-t border-gray-200 w-full"></div>
              <span className="bg-white px-4 text-xs text-gray-400 font-medium uppercase tracking-wider">or sign in with email</span>
              <div className="border-t border-gray-200 w-full"></div>
            </div>

            <form onSubmit={submitHandler} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FaEnvelope />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition text-sm bg-gray-50 focus:bg-white"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <a href="#" className="text-xs text-blue-600 hover:text-blue-500 font-medium">Forgot password?</a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FaLock />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition text-sm bg-gray-50 focus:bg-white"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-lg hover:bg-blue-600 transition font-medium tracking-wide shadow-md disabled:opacity-70"
              >
                {loading ? 'Signing in...' : 'Sign In'} 
                {!loading && <FaArrowRight className="text-sm" />}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 font-bold hover:underline">
                Create one now
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="hidden lg:block w-1/2 relative bg-gray-100">
          <img 
            src="/images/login_lifestyle.png" 
            alt="Workspace" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent flex flex-col justify-end p-12">
            <h3 className="text-white text-3xl font-bold mb-2">Elevate your workspace.</h3>
            <p className="text-gray-200">Join thousands of professionals upgrading their gear.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
