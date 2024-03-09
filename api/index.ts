import express from 'express';
import { environment } from './environments/environment';
import * as mongoose from 'mongoose';

const run = async () => {
  const server = express();

  await mongoose.connect(environment.databaseUrl);

  server.use(express.json());

  server.get<{}, { test: string }>('/api/test/', (req, res) => {
    res.status(200).json({ test: 'hello' });
  });

  server.listen(environment.port, () => {
    if (!environment.production) {
      console.log(`Node Express server listening on http://localhost:${environment.port}/api`);
    }
  });
};

run()
  .then()
  .catch(error => console.error(error));
