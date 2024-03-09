import { port, production, databaseUrl } from './environment.development';

export const environment = {
  production: process.env['production'] || production,
  port: process.env['port'] || port,
  databaseUrl: process.env['databaseUrl'] || databaseUrl,
};
