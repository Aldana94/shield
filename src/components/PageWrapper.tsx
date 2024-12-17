'use client';

import { Auth0Provider } from '@auth0/auth0-react';
import { EnvironmentProvider } from '@/contexts/EnvironmentContext';
import MainLayout from '@/components/layout/MainLayout';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
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
          {children}
        </MainLayout>
      </EnvironmentProvider>
    </Auth0Provider>
  );
}