'use client';

import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Shield, Loader2 } from 'lucide-react';

const LoginPage = () => {
  const { loginWithRedirect, isLoading } = useAuth0();
  const [isHovered, setIsHovered] = useState(false);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-full bg-blue-500/10 mb-4">
            <Shield className="w-12 h-12 text-blue-500" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Welcome to Shield</h2>
          <p className="text-gray-400">Sign in to access your scripts dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-2xl">
          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => loginWithRedirect()}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-[1.02]"
          >
            <span>Continue with Email</span>
            <div 
              className={`w-5 h-0.5 bg-white/70 transition-all duration-300 ${
                isHovered ? 'w-8' : 'w-5'
              }`}
            />
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Powered by{' '}
            <span className="text-blue-400">Shield</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;