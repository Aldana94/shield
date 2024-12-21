import { Environment } from '@/config/environments';

export interface Client {
  client_id: string;
  name: string;
}

export interface Store {
  id: string;
  name: string;
  client_id: string;
}

export async function getClients(environment: string): Promise<Client[]> {
  try {
    console.log('Fetching clients for environment:', environment);
    const response = await fetch(
      `/api/stores?environment=${environment}&action=clients`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        }
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch clients');
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch clients');
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }
}

export async function getStoresByClient(environment: string, clientId: string): Promise<Store[]> {
  try {
    console.log('Fetching stores for environment:', environment, 'clientId:', clientId);
    const response = await fetch(
      `/api/stores?environment=${environment}&clientId=${clientId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        }
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch stores');
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch stores');
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching stores:', error);
    throw error;
  }
}