import { Environment } from '@/config/environments';
import { ApiResponse } from './api';

export async function generateBackup(environment: Environment, storeIds: string[]): Promise<ApiResponse> {
  try {
    const response = await fetch('/api/backup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        environment,
        storeIds
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate backup');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error generating backup:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}