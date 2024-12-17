'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { environments, type Environment } from '@/config/environments';

interface EnvironmentContextType {
  currentEnvironment: Environment;
  isConnecting: boolean;
  connectToEnvironment: (env: Environment) => Promise<void>;
}

const EnvironmentContext = createContext<EnvironmentContextType | undefined>(undefined);

export function EnvironmentProvider({ children }: { children: React.ReactNode }) {
  const [currentEnvironment, setCurrentEnvironment] = useState<Environment>('STAGING');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedEnv = localStorage.getItem('selectedEnvironment') as Environment;
    if (savedEnv && !isInitialized) {
      setCurrentEnvironment(savedEnv);
      setIsInitialized(true);
    }
  }, []);

  const connectToEnvironment = async (env: Environment) => {
    try {
      setIsConnecting(true);
      const response = await fetch('/api/db', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ environment: env }),
      });

      if (!response.ok) {
        throw new Error('Failed to connect to databases');
      }

      setCurrentEnvironment(env);
      localStorage.setItem('selectedEnvironment', env);
    } catch (error) {
      console.error('Failed to connect to databases:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <EnvironmentContext.Provider
      value={{
        currentEnvironment,
        isConnecting,
        connectToEnvironment,
      }}
    >
      {children}
    </EnvironmentContext.Provider>
  );
}

export function useEnvironment() {
  const context = useContext(EnvironmentContext);
  if (context === undefined) {
    throw new Error('useEnvironment must be used within an EnvironmentProvider');
  }
  return context;
}