// src/config/environments.ts

const DB_USER = 'andres_aldana';
const DB_PASSWORD = 'JTm4WVtAXW3J6k3KQjNCWEPUkd7LPqND';

export const environments = {
  AMERICA: {
    name: 'America',
    databases: {
      DEADPOOL: {
        host: 'production-deadpool.cvemnhsrlfak.us-east-1.rds.amazonaws.com',
        database: 'deadpool',
        user: DB_USER,
        password: DB_PASSWORD,
        port: 5432
      },
      NEBULA: {
        host: 'production-nebula.cvemnhsrlfak.us-east-1.rds.amazonaws.com',
        database: 'nebula',
        user: DB_USER,
        password: DB_PASSWORD,
        port: 5432
      },
      ODIN: {
        host: 'production-odin.cvemnhsrlfak.us-east-1.rds.amazonaws.com',
        database: 'odin',
        user: DB_USER,
        password: DB_PASSWORD,
        port: 5432
      },
      TESSERACT: {
        host: 'production-tesseract.cvemnhsrlfak.us-east-1.rds.amazonaws.com',
        database: 'tesseract',
        user: DB_USER,
        password: DB_PASSWORD,
        port: 5432
      },
      TONGOMORT: {
        host: 'production-tongomort.cvemnhsrlfak.us-east-1.rds.amazonaws.com',
        database: 'tongomort',
        user: DB_USER,
        password: DB_PASSWORD,
        port: 5432
      }
    }
  },
  EUROPE: {
    name: 'Europe',
    databases: {
      ANTMAN: {
        host: 'special-sailfish-antman.cp1pd7kx1ftn.eu-west-1.rds.amazonaws.com',
        database: 'antman',
        user: DB_USER,
        password: DB_PASSWORD,
        port: 5432
      },
      NEBULA: {
        host: 'nebula.db.special-sailfish.internal.instaleap.io',
        database: 'nebula',
        user: DB_USER,
        password: DB_PASSWORD,
        port: 5432
      },
      ODIN: {
        host: 'special-sailfish-odin.cp1pd7kx1ftn.eu-west-1.rds.amazonaws.com',
        database: 'odin',
        user: DB_USER,
        password: DB_PASSWORD,
        port: 5432
      }
    }
  },
  MIDDLE_EAST: {
    name: 'Middle East',
    databases: {
      NEBULA: {
        host: 'nebula.db.creative-iguana.internal.instaleap.io',
        database: 'nebula',
        user: DB_USER,
        password: DB_PASSWORD,
        port: 5432
      }
    }
  },
  STAGING: {
    name: 'Staging',
    databases: {
      ALL: {
        host: 'xandar.db.internal.instaleap.io',
        database: 'postgres',
        user: DB_USER,
        password: DB_PASSWORD,
        port: 5432,
        schemas: {
          ANTMAN: 'antman',
          DEADPOOL: 'deadpool',
          NEBULA: 'nebula',
          ODIN: 'odin',
          TONGOMORT: 'tongomort',
          WANDA: 'wanda'
        }
      }
    }
  }
} as const;

export type Environment = keyof typeof environments;
export type Database = keyof typeof environments[Environment]['databases'];