import {
  port,
  production,
  databaseUrl,
  imagesPath,
  jwtSecret,
  jwtExpiry,
  bcryptSaltRounds,
} from './environment.development';

export const environment = {
  production: process.env['production'] || production,
  port: process.env['port'] || port,
  databaseUrl: process.env['databaseUrl'] || databaseUrl,
  imagesPath: process.env['imagesPath'] || imagesPath,
  jwtSecret: process.env['jwtSecret'] || jwtSecret,
  jwtExpiry: process.env['jwtExpiry'] || jwtExpiry,
  bcryptSaltRounds: process.env['bcryptSaltRounds'] || bcryptSaltRounds,
};
