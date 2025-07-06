import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaUser, FaUserShield } from 'react-icons/fa';
import axios from 'axios';

const LoginRegisterPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [role, setRole] = useState('user');

  // 🔍 Step 1: State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 🔍 Step 2: Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { email, password, role };

    try {
      const url =
        activeTab === 'login'
          ? 'http://localhost:5000/api/auth/login'
          : 'http://localhost:5000/api/auth/register';

      const res = await axios.post(url, payload);

      if (activeTab === 'login') {
        localStorage.setItem('token', res.data.token);
        alert('Login successful');

        if (res.data.role === 'admin') {
          window.location.href = '/dashboard-admin';
        } else {
          window.location.href = '/dashboard-user';
        }
      } else {
        alert('Registered successfully, please login.');
        setActiveTab('login');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <div className="bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl w-full max-w-sm p-8">
        <div className="flex justify-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
            alt="logo"
            className="w-10 h-10"
          />
        </div>

        <h2 className="text-center text-2xl font-bold text-gray-800 mb-1">
          Welcome to Dataverse analytics
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Your secure gateway to advanced features and personalized experiences.
        </p>

        <div className="flex justify-between mb-6 border-b border-gray-300">
          <button
            onClick={() => setActiveTab('login')}
            className={`w-1/2 pb-2 transition text-center text-sm font-medium ${
              activeTab === 'login'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`w-1/2 pb-2 transition text-center text-sm font-medium ${
              activeTab === 'register'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500'
            }`}
          >
            Register
          </button>
        </div>

        {/* 🔍 Bind input fields */}
        <div className="mb-4 flex items-center border rounded-lg px-3 py-2 bg-white">
          <FaEnvelope className="text-gray-400 mr-2" />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-sm focus:outline-none"
          />
        </div>

        <div className="mb-4 flex items-center border rounded-lg px-3 py-2 bg-white">
          <FaLock className="text-gray-400 mr-2" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-sm focus:outline-none"
          />
        </div>

        {/* Role Toggle */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setRole('user')}
            className={`flex items-center gap-2 px-5 py-2 border text-sm rounded-md transition font-medium ${
              role === 'user'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
            }`}
          >
            <FaUser /> User
          </button>
          <button
            onClick={() => setRole('admin')}
            className={`flex items-center gap-2 px-5 py-2 border text-sm rounded-md transition font-medium ${
              role === 'admin'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
            }`}
          >
            <FaUserShield /> Admin
          </button>
        </div>

        {/* 🔍 Connect to submit function */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg transition"
        >
          {activeTab === 'login' ? 'Secure Login' : 'Register Now'}
        </button>

        {activeTab === 'login' && (
          <p className="text-center mt-4 text-xs text-blue-600 cursor-pointer hover:underline">
            Forgot your password?
          </p>
        )}

        <p className="text-xs text-center mt-6 text-gray-500">
          By continuing, you agree to our{' '}
          <a className="underline text-blue-500" href="#">
            Terms of Service
          </a>{' '}
          and{' '}
          <a className="underline text-blue-500" href="#">
            Privacy Policy
          </a>.
        </p>
      </div>
    </div>
  );
};

export default LoginRegisterPage;
