import express from 'express';
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';
import { environment } from './environments/environment';
import { bannersRoutes } from './routes/bannersRoutes';
import { sliderRoutes } from './routes/sliderRoutes';
import { categoriesRoutes } from './routes/categoriesRoutes';
import { productsRoutes } from './routes/productsRoutes';
import { ordersRoutes } from './routes/ordersRoutes';
import { errorHandler } from './errors/error.handler';
import { NotFoundError } from './errors/not-found.error';

const run = async (): Promise<void> => {
  const server = express();

  await mongoose.connect(environment.databaseUrl);

  server.use(express.json());
  server.use(
    fileUpload({
      createParentPath: true,
      limits: { fileSize: 100 * 1024 * 1024 },
      limitHandler: true,
      abortOnLimit: true,
      responseOnLimit: 'Files cannot be larger than 100 mb',
    }),
  );

  // Express Rest API
  server.use('/api/banners', bannersRoutes);
  server.use('/api/slider', sliderRoutes);
  server.use('/api/categories', categoriesRoutes);
  server.use('/api/products', productsRoutes);
  server.use('/api/orders', ordersRoutes);

  server.get('/api/**', (_req, _res) => {
    throw new NotFoundError();
  });

  server.use(errorHandler);

  server.listen(environment.port, () => {
    if (!environment.production) {
      console.log(`Node Express server listening on http://localhost:${environment.port}/api`);
    }
  });
};

run()
  .then()
  .catch(error => console.error(error));
