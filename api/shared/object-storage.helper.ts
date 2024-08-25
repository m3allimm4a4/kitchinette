import multer from 'multer';
import multerS3 from 'multer-s3';
import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { environment } from '../environments/environment';
import { generateRandomFileName } from './helpers';
import { s3Client } from '../clients/s3.client';
import { UploadedFile } from 'express-fileupload';

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: environment.objectStorageBucket,
    acl: 'public-read',
    key: function (_, file, cb) {
      cb(null, generateRandomFileName(file.originalname));
    },
  }),
});

// export const uploadSingle = async (fieldName: string, req: Request, res: Response) => {
//   const uploadAsync = util.promisify(upload.single(fieldName));
//   return uploadAsync(req, res);
// };

export const deleteObject = (file: string) => {
  const command = new DeleteObjectCommand({
    Bucket: environment.objectStorageEndpoint,
    Key: file,
  });
  return s3Client.send(command);
};

export const putObject = (file: UploadedFile, fileName: string) => {
  const command = new PutObjectCommand({
    Bucket: environment.objectStorageBucket,
    Body: file.data,
    Key: fileName,
  });
  return s3Client.send(command);
}
