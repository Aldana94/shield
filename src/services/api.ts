import { environments, type Environment } from '@/config/environments';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function fetchSlotPolicies(environment: Environment, storeId: string): Promise<ApiResponse> {
  const endpoint = environments[environment].endpoints.NEBULA;
  const bearer = environments[environment].auth.bearer;

  try {
    const response = await fetch(
      `${endpoint}/stores/${storeId}/slot-policies`,
      {
        headers: {
          'Authorization': `Bearer ${bearer}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error('Error fetching slot policies:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

export async function createSlotPolicy(
  environment: Environment, 
  storeId: string, 
  policyData: any
): Promise<ApiResponse> {
  const endpoint = environments[environment].endpoints.NEBULA;
  const bearer = environments[environment].auth.bearer;

  try {
    const response = await fetch(
      `${endpoint}/stores/${storeId}/slot-policies`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${bearer}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(policyData)
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error('Error creating slot policy:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

export async function updateSlotPolicy(
  environment: Environment, 
  storeId: string, 
  policyId: string, 
  policyData: any
): Promise<ApiResponse> {
  const endpoint = environments[environment].endpoints.NEBULA;
  const bearer = environments[environment].auth.bearer;

  try {
    const response = await fetch(
      `${endpoint}/stores/${storeId}/slot-policies/${policyId}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${bearer}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(policyData)
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error('Error updating slot policy:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

export async function getStores(environment: string, clientId: string) {
  try {
    const response = await fetch(
      `/api/stores?environment=${environment}&clientId=${clientId}`,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching stores:', error);
    throw error;
  }
}

export async function deleteSlotPolicy(
  environment: Environment, 
  storeId: string, 
  policyId: string
): Promise<ApiResponse> {
  const endpoint = environments[environment].endpoints.NEBULA;
  const bearer = environments[environment].auth.bearer;

  try {
    const response = await fetch(
      `${endpoint}/stores/${storeId}/slot-policies/${policyId}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${bearer}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return {
      success: true
    };
  } catch (error) {
    console.error('Error deleting slot policy:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

export async function getSlotPolicyById(
  environment: Environment, 
  storeId: string, 
  policyId: string
): Promise<ApiResponse> {
  const endpoint = environments[environment].endpoints.NEBULA;
  const bearer = environments[environment].auth.bearer;

  try {
    const response = await fetch(
      `${endpoint}/stores/${storeId}/slot-policies/${policyId}`,
      {
        headers: {
          'Authorization': `Bearer ${bearer}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error('Error fetching slot policy:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}