'use client';

import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { 
  Loader2, 
  ShoppingCart, 
  Terminal, 
  Cloud, 
  Skull, 
  BookOpen, 
  LogOut, 
  Globe,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Code,
  Shield as ShieldIcon
} from 'lucide-react';
import { environments } from '@/config/environments';
import type { Environment } from '@/config/environments';
import LoadingScreen from '@/components/LoadingScreen';
import LoginPage from '@/components/LoginPage';
import { useEnvironment } from '@/contexts/EnvironmentContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type ServiceType = {
  name: string;
  icon: React.ComponentType<any>;
  path: string;
  services?: {
    name: string;
    icon: React.ComponentType<any>;
    path: string;
  }[];
};

const mainMenuItems: ServiceType[] = [
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard'
  },
  {
    name: 'Scripts',
    icon: Code,
    path: '/scripts',
    services: [
      { name: 'E-Commerce', icon: ShoppingCart, path: '/e-commerce' },
      { name: 'Antman', icon: Terminal, path: '/antman' },
      { name: 'Tesseract', icon: Terminal, path: '/tesseract' },
      { name: 'Nebula', icon: Cloud, path: '/nebula' },
      { name: 'Deadpool', icon: Skull, path: '/deadpool' },
      { name: 'Redbook', icon: BookOpen, path: '/redbook' }
    ]
  },
  {
    name: 'Shield',
    icon: ShieldIcon,
    path: '/shield'
  }
];

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps): JSX.Element {
  const { isLoading, isAuthenticated, logout, user } = useAuth0();
  const { currentEnvironment, isConnecting, connectToEnvironment } = useEnvironment();
  const [expandedMenu, setExpandedMenu] = useState<string | null>('Scripts');
  const pathname = usePathname();

  if (isLoading || isConnecting) {
    return <LoadingScreen environment={environments[currentEnvironment].name} />;
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const isLinkActive = (path: string) => pathname === path;
  const isMenuActive = (item: ServiceType) => 
    item.services?.some(service => pathname === service.path) || pathname === item.path;

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        {/* User Profile and Environment Selector */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center space-x-3 mb-4">
            <img
              src={user?.picture || '/api/placeholder/32/32'}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="font-medium truncate">{user?.name}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-gray-400" />
            <select
              value={currentEnvironment}
              onChange={(e) => connectToEnvironment(e.target.value as Environment)}
              className="w-full bg-gray-800 text-sm rounded px-2 py-1 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {Object.entries(environments).map(([key, env]) => (
                <option key={key} value={key}>
                  {env.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Main Navigation */}
        <nav className="flex-1 py-4">
          {mainMenuItems.map((item) => (
            <div key={item.name}>
              {item.services ? (
                <div>
                  <button
                    onClick={() => setExpandedMenu(expandedMenu === item.name ? null : item.name)}
                    className={`w-full flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors ${
                      isMenuActive(item) ? 'bg-gray-800 text-white' : ''
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    <span className="flex-1">{item.name}</span>
                    {expandedMenu === item.name ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  
                  {expandedMenu === item.name && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.services.map((service) => (
                        <Link
                          key={service.path}
                          href={service.path}
                          className={`flex items-center px-4 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors rounded-lg ${
                            isLinkActive(service.path) ? 'bg-gray-800 text-white' : ''
                          }`}
                        >
                          <service.icon className="w-4 h-4 mr-3" />
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.path}
                  className={`flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors ${
                    isLinkActive(item.path) ? 'bg-gray-800 text-white' : ''
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.name}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          onClick={() => logout({ returnTo: window.location.origin })}
          className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors border-t border-gray-800"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 bg-gray-100 overflow-auto">
        <header className="bg-white shadow sticky top-0 z-10">
          <div className="px-6 py-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Shield Dashboard</h1>
            <span className="text-sm text-gray-500">
              Environment: {environments[currentEnvironment].name}
            </span>
          </div>
        </header>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}