import express from 'express';
import { environment } from './environment/environment';

const run = () => {
  const server = express();

  server.get('/api/test/', (_req, res) => {
    res.status(200).json({ test: 'hello' });
  });

  server.listen(environment.port, () => {
    if (!environment.production) {
      console.log(`Node Express server listening on http://localhost:${environment.port}/api`);
    }
  });
};

run();
