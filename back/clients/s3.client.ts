import { S3 } from '@aws-sdk/client-s3';
import { environment } from '../environments/environment';

const s3Client = new S3({
  forcePathStyle: false, // Configures to use subdomain/virtual calling format.
  endpoint: environment.objectStorageEndpoint,
  region: 'us-east-1',
  credentials: {
    accessKeyId: environment.objectStorageKeyId,
    secretAccessKey: environment.objectStorageSecret,
  },
});

export { s3Client };
