import mongoose, { ConnectOptions } from 'mongoose';
import express, { Express } from 'express';
import cors from 'cors';
import { router } from '../router';
export async function disconnectDBForTesting() {
  try {
    await mongoose.connection.close();
  } catch (error) {
    console.log('DB disconnect error');
  }
}

export async function connectDBforTesting(): Promise<void> {
  await mongoose.connect('mongodb://127.0.0.1:27017/testDb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);
}
export function createServer(): Express {
  const app: Express = express();
  app.use(cors({ origin: true }));
  app.use(express.json());

  app.use(router);
  return app;
}
