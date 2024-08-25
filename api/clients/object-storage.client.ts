import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { environment } from '../environments/environment';
import { s3Client } from './s3.client';

export const deleteObject = (fileName: string) => {
  const command = new DeleteObjectCommand({
    Bucket: environment.objectStorageEndpoint,
    Key: fileName,
  });
  return s3Client.send(command);
};

export const putObject = (data: Buffer, fileName: string) => {
  const command = new PutObjectCommand({
    Bucket: environment.objectStorageBucket,
    Body: data,
    Key: fileName,
  });
  return s3Client.send(command);
};

export default { deleteObject, putObject };
