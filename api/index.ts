import express from 'express';
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';
import { environment } from './environments/environment';
import { bannersRoutes } from './routes/bannersRoutes';
import { sliderRoutes } from './routes/sliderRoutes';
import { categoriesRoutes } from './routes/categoriesRoutes';
import { brandsRoutes } from './routes/brandsRoutes';
import { productsRoutes } from './routes/productsRoutes';
import { ordersRoutes } from './routes/ordersRoutes';
import { errorHandler } from './errors/error.handler';

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
  // server.use('/api/brands', brandsRoutes);
  // server.use('/api/products', productsRoutes);
  // server.use('/api/orders', ordersRoutes);

  server.get('/api/**', (_, res) => {
    res.status(404).json({ message: `route doesn't exist` });
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
