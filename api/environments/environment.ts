import {
  bcryptSaltRounds,
  brevoApiKey,
  databaseUrl,
  imagesPath,
  jwtExpiry,
  jwtSecret,
  objectStorageEndpoint,
  objectStorageSecret,
  objectStorageKeyId,
  objectStorageBucket,
  port,
  production,
  senderEmail,
} from './environment.development';

export const environment = {
  production: process.env['production'] || production,
  port: process.env['port'] || port,
  databaseUrl: process.env['databaseUrl'] || databaseUrl,
  imagesPath: process.env['imagesPath'] || imagesPath,
  jwtSecret: process.env['jwtSecret'] || jwtSecret,
  jwtExpiry: process.env['jwtExpiry'] || jwtExpiry,
  bcryptSaltRounds: process.env['bcryptSaltRounds'] || bcryptSaltRounds,
  brevoApiKey: process.env['brevoApiKey'] || brevoApiKey,
  senderEmail: process.env['senderEmail'] || senderEmail,
  objectStorageEndpoint: process.env['objectStorageEndpoint'] || objectStorageEndpoint,
  objectStorageBucket: process.env['objectStorageBucket'] || objectStorageBucket,
  objectStorageKeyId: process.env['objectStorageKeyId'] || objectStorageKeyId,
  objectStorageSecret: process.env['objectStorageSecret'] || objectStorageSecret,
};
