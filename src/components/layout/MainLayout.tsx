'use client';

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { 
  Loader2, 
  ShoppingCart, 
  Terminal, 
  Cloud, 
  Skull, 
  BookOpen, 
  LogOut, 
  Globe 
} from 'lucide-react';
import { environments } from '@/config/environments';
import type { Environment } from '@/config/environments';
import LoadingScreen from '@/components/LoadingScreen';
import LoginPage from '@/components/LoginPage';
import { useEnvironment } from '@/contexts/EnvironmentContext';
import Link from 'next/link';

type ServiceType = {
  name: string;
  icon: React.ComponentType<any>;
  path: string;
};

const services: ServiceType[] = [
  { name: 'E-Commerce', icon: ShoppingCart, path: '/e-commerce' },
  { name: 'Antman', icon: Terminal, path: '/antman' },
  { name: 'Tesseract', icon: Terminal, path: '/tesseract' },
  { name: 'Nebula', icon: Cloud, path: '/nebula' },
  { name: 'Deadpool', icon: Skull, path: '/deadpool' },
  { name: 'Redbook', icon: BookOpen, path: '/redbook' }
];

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps): JSX.Element {
  const { isLoading, isAuthenticated, logout, user } = useAuth0();
  const { currentEnvironment, isConnecting, connectToEnvironment } = useEnvironment();

  if (isLoading || isConnecting) {
    return <LoadingScreen environment={environments[currentEnvironment].name} />;
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return React.createElement(
    'div',
    { className: "flex h-screen" },
    React.createElement(
      'aside',
      { className: "w-64 bg-gray-900 text-white flex flex-col" },
      React.createElement(
        'div',
        { className: "p-4 border-b border-gray-800" },
        React.createElement(
          'div',
          { className: "flex items-center space-x-3 mb-4" },
          React.createElement('img', {
            src: user?.picture || '/api/placeholder/32/32',
            alt: "Profile",
            className: "w-8 h-8 rounded-full"
          }),
          React.createElement(
            'span',
            { className: "font-medium truncate" },
            user?.name
          )
        ),
        React.createElement(
          'div',
          { className: "flex items-center space-x-2" },
          React.createElement(Globe, { className: "w-4 h-4 text-gray-400" }),
          React.createElement(
            'select',
            {
              value: currentEnvironment,
              onChange: (e) => connectToEnvironment(e.target.value as Environment),
              className: "w-full bg-gray-800 text-sm rounded px-2 py-1 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            },
            Object.entries(environments).map(([key, env]) =>
              React.createElement(
                'option',
                { key, value: key },
                env.name
              )
            )
          )
        )
      ),
      React.createElement(
        'nav',
        { className: "mt-4 flex-1" },
        services.map((service) =>
          React.createElement(
            'a',
            {
              key: service.path,
              href: service.path,
              className: "flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            },
            React.createElement(service.icon, { className: "w-5 h-5 mr-3" }),
            service.name
          )
        )
      ),
      React.createElement(
        'button',
        {
          onClick: () => logout({ returnTo: window.location.origin }),
          className: "flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors border-t border-gray-800"
        },
        React.createElement(LogOut, { className: "w-5 h-5 mr-3" }),
        'Logout'
      )
    ),
    React.createElement(
      'main',
      { className: "flex-1 bg-gray-100" },
      React.createElement(
        'header',
        { className: "bg-white shadow" },
        React.createElement(
          'div',
          { className: "px-6 py-4 flex items-center justify-between" },
          React.createElement(
            'h1',
            { className: "text-xl font-semibold" },
            'Shield Dashboard'
          ),
          React.createElement(
            'span',
            { className: "text-sm text-gray-500" },
            `Environment: ${environments[currentEnvironment].name}`
          )
        )
      ),
      React.createElement(
        'div',
        { className: "p-6" },
        children
      )
    )
  );
}