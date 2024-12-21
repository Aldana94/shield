const DB_USER = 'andres_aldana';
const DB_PASSWORD = 'JTm4WVtAXW3J6k3KQjNCWEPUkd7LPqND';
const BEARER_TOKEN = 'HCiJnV2BGe7lTTwu1Ml0AYkCMGFu5uMr';

export const endpoints = {
  AMERICA: {
    NEBULA: 'https://nebula.production.internal.instaleap.io',
    DEADPOOL: 'https://deadpool.production.internal.instaleap.io',
    ODIN: 'https://odin.production.internal.instaleap.io',
    TESSERACT: 'https://tesseract.production.internal.instaleap.io',
    TONGOMORT: 'https://tongomort.production.internal.instaleap.io'
  },
  EUROPE: {
    NEBULA: 'https://nebula.special-sailfish.internal.instaleap.io',
    ANTMAN: 'https://antman.special-sailfish.internal.instaleap.io',
    ODIN: 'https://odin.special-sailfish.internal.instaleap.io'
  },
  MIDDLE_EAST: {
    NEBULA: 'https://nebula.creative-iguana.internal.instaleap.io'
  }
} as const;

export const clients = {
  NEBULA: {
    AMERICA: [
      {
        name: 'Jumbo',
        storeId: 'ee2f60c3-0439-4cde-bd9a-9870d0a52dab'
      }
    ],
    EUROPE: [
      {
        name: 'Eroski',
        storeId: 'ee2f60c3-0439-4cde-bd9a-9870d0a52dab'
      }
    ],
    MIDDLE_EAST: [
      {
        name: 'Carrefour',
        storeId: 'ee2f60c3-0439-4cde-bd9a-9870d0a52dab'
      }
    ]
  }
} as const;

export const environments = {
  AMERICA: {
    name: 'America',
    endpoints: endpoints.AMERICA,
    clients: clients,
    auth: {
      bearer: BEARER_TOKEN
    },
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
    endpoints: endpoints.EUROPE,
    clients: clients,
    auth: {
      bearer: BEARER_TOKEN
    },
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
    endpoints: endpoints.MIDDLE_EAST,
    clients: clients,
    auth: {
      bearer: BEARER_TOKEN
    },
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
    endpoints: endpoints.AMERICA,
    clients: clients,
    auth: {
      bearer: BEARER_TOKEN
    },
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
export type Service = keyof typeof endpoints[keyof typeof endpoints];
export type Client = keyof typeof clients;