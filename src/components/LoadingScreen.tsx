'use client';

import React from 'react';
import { Globe, Database, Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  environment?: string;
}

const LoadingScreen = ({ environment = 'environment' }: LoadingScreenProps) => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="relative">
        {/* Círculos orbitando */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border-2 border-blue-500/20 animate-[spin_3s_linear_infinite]">
            <div className="absolute -left-1 top-1/2 transform -translate-y-1/2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border-2 border-indigo-500/20 animate-[spin_2s_linear_infinite]">
            <div className="absolute -right-1 top-1/2 transform -translate-y-1/2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Icono central */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          <Globe className="w-8 h-8 text-white animate-pulse" />
        </div>
      </div>

      {/* Texto de loading */}
      <div className="mt-8 text-center">
        <h2 className="text-xl font-semibold text-white mb-2">
          Switching Environment
        </h2>
        <div className="flex items-center justify-center space-x-2 text-gray-400">
          <Database className="w-4 h-4 animate-pulse" />
          <span>Connecting to {environment}</span>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="mt-6 w-64">
        <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full animate-[progressBar_1.5s_ease-in-out_infinite]"></div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes progressBar {
          0% {
            width: 0%;
          }
          50% {
            width: 100%;
          }
          100% {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;