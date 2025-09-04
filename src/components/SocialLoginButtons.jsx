import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FaGoogle, FaFacebook, FaInstagram } from 'react-icons/fa';

const SocialLoginButtons = ({ loading }) => {
  const { loginWithGoogle, loginWithFacebook, loginWithInstagram } = useAuth() || {};

  return (
    <div className="flex flex-col gap-4 mt-6">
      <button
        onClick={loginWithGoogle}
        disabled={loading}
        className="flex items-center justify-center bg-gradient-to-r from-red-500 to-red-700 text-white font-bold px-7 py-3 rounded-2xl shadow-xl hover:from-red-400 hover:to-red-600 transition-all duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        <FaGoogle className="w-6 h-6 mr-3" />
        Login with Google
      </button>
      <button
        onClick={loginWithFacebook}
        disabled={loading}
        className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold px-7 py-3 rounded-2xl shadow-xl hover:from-blue-400 hover:to-blue-600 transition-all duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <FaFacebook className="w-6 h-6 mr-3" />
        Login with Facebook
      </button>
      <button
        onClick={loginWithInstagram}
        disabled={loading}
        className="flex items-center justify-center bg-gradient-to-r from-pink-500 via-yellow-400 to-yellow-500 text-white font-bold px-7 py-3 rounded-2xl shadow-xl hover:from-pink-400 hover:via-yellow-300 hover:to-yellow-400 transition-all duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
      >
        <FaInstagram className="w-6 h-6 mr-3" />
        Login with Instagram
      </button>
    </div>
  );
};

export default SocialLoginButtons;