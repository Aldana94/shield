import { NextResponse } from 'next/server';
import { environments } from '@/config/environments';

export async function POST(request: Request) {
  try {
    const { environment, storeIds } = await request.json();
    const endpoint = environments[environment].endpoints.NEBULA;
    const bearer = environments[environment].auth.bearer;

    const results = await Promise.all(
      storeIds.map(async (storeId: string) => {
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
            return {
              storeId,
              success: false,
              error: `HTTP error! status: ${response.status}`
            };
          }

          const data = await response.json();
          return {
            storeId,
            success: true,
            data
          };
        } catch (error) {
          return {
            storeId,
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
          };
        }
      })
    );

    return NextResponse.json({
      success: true,
      data: results
    });
  } catch (error) {
    console.error('Backup generation error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to generate backup',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}