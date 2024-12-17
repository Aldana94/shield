// src/app/api/db/route.ts
import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import { environments, type Environment } from '@/config/environments';

const pools: Record<string, Pool> = {};

export async function POST(request: Request) {
  try {
    const { environment } = await request.json() as { environment: Environment };
    const envConfig = environments[environment];
    
    // Cerrar todas las conexiones existentes
    for (const poolKey in pools) {
      await pools[poolKey].end();
      delete pools[poolKey];
    }

    // Establecer todas las conexiones para el ambiente seleccionado
    const connections = Object.entries(envConfig.databases).map(async ([dbKey, config]) => {
      if (environment === 'STAGING') {
        // Para staging, conectar a la única base de datos y configurar cada schema
        const poolKey = `STAGING-${dbKey}`;
        pools[poolKey] = new Pool({
          host: config.host,
          port: config.port,
          database: config.database,
          user: config.user,
          password: config.password,
          ssl: {
            rejectUnauthorized: false
          }
        });

        // Probar la conexión
        const client = await pools[poolKey].connect();
        try {
          await client.query('SELECT 1');
        } finally {
          client.release();
        }
      } else {
        // Para otros ambientes, conectar a cada base de datos
        const poolKey = `${environment}-${dbKey}`;
        pools[poolKey] = new Pool({
          host: config.host,
          port: config.port,
          database: config.database,
          user: config.user,
          password: config.password,
          ssl: {
            rejectUnauthorized: false
          }
        });

        // Probar la conexión
        const client = await pools[poolKey].connect();
        try {
          await client.query('SELECT 1');
        } finally {
          client.release();
        }
      }
    });

    await Promise.all(connections);

    return NextResponse.json({ 
      success: true,
      message: `Connected to all databases in ${environment}`
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      { error: 'Failed to connect to databases' }, 
      { status: 500 }
    );
  }
}