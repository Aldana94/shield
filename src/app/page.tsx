'use client';

import { Auth0Provider } from '@auth0/auth0-react';
import { EnvironmentProvider } from '@/contexts/EnvironmentContext';
import MainLayout from '@/components/layout/MainLayout';

export default function RootPage() {
  return (
    <Auth0Provider
      domain="xandar-odin.auth0.com"
      clientId="sw7iNBj06qoySF3g12YrtYXkB6h5iAkk"
      authorizationParams={{
        redirect_uri: typeof window !== 'undefined' ? window.location.origin : ''
      }}
    >
      <EnvironmentProvider>
        <MainLayout>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Welcome to Shield</h2>
            <p className="text-gray-600">
              Select a service from the sidebar to manage your scripts.
            </p>
          </div>
        </MainLayout>
      </EnvironmentProvider>
    </Auth0Provider>
  );
}