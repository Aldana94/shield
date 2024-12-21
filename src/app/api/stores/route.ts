import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import { environments } from '@/config/environments';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const environment = searchParams.get('environment');
    const action = searchParams.get('action');
    const clientId = searchParams.get('clientId');

    if (!environment) {
      return NextResponse.json(
        { error: 'Missing environment parameter' },
        { status: 400 }
      );
    }

    const dbConfig = environments[environment].databases.NEBULA;
    const pool = new Pool({
      host: dbConfig.host,
      port: dbConfig.port,
      database: dbConfig.database,
      user: dbConfig.user,
      password: dbConfig.password,
      ssl: {
        rejectUnauthorized: false
      }
    });

    let result;
    
    try {
      if (action === 'clients') {
        // Obtener clientes únicos
        result = await pool.query(`
          SELECT DISTINCT client_id, MIN(name) as name
          FROM logistics.stores
          WHERE client_id IS NOT NULL
          GROUP BY client_id
          ORDER BY client_id;
        `);
      } else if (clientId) {
        // Obtener tiendas de un cliente específico
        result = await pool.query(`
          SELECT 
            id,
            name,
            client_id
          FROM logistics.stores 
          WHERE client_id = $1
          ORDER BY name
        `, [clientId]);
      } else {
        return NextResponse.json(
          { error: 'Invalid parameters' },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        data: result.rows
      });
    } catch (dbError) {
      console.error('Database query error:', dbError);
      return NextResponse.json(
        { error: 'Database query failed', details: dbError.message },
        { status: 500 }
      );
    } finally {
      await pool.end();
    }
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}