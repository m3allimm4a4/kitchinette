import { randomUUID } from 'crypto';
import { UploadedFile } from 'express-fileupload';
import { join } from 'path';
import { rm, access } from 'fs/promises';
import { environment } from '../environments/environment';

const getFileExtension = (name: string) => name.split('.').pop();

const generateRandomFileName = (name: string): string => `${randomUUID()}.${getFileExtension(name)}`;

export const getImageName = (imageUrl: string): string => {
  return imageUrl.replace(`${environment.imagesPath}/`, '');
};

export const saveUploadedFile = async (file: UploadedFile): Promise<string> => {
  const fileName = generateRandomFileName(file.name);
  const filePath = join(environment.imagesPath, fileName);
  await file.mv(filePath);
  return fileName;
};

export const deleteImageFile = async (imageName: string): Promise<void> => {
  const path = join(environment.imagesPath, imageName);
  try {
    await access(path);
    await rm(path);
  } catch (error) {
    return;
  }
};
