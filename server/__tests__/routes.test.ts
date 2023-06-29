import mongoose from 'mongoose';
import supertest from 'supertest';

import cors from 'cors';
import { router } from '../router';
import express, { Express, Request, Response } from 'express';

import { UserModel } from '../models/userModel';

function createServer() {
  const app: Express = express();
  app.use(cors({ origin: true }));
  app.use(express.json());
  app.use(router);
  return app;
}

async function disconnectDBForTesting() {
  try {
    await mongoose.connection.close();
  } catch (error) {
    console.log('DB disconnect error');
  }
}
beforeAll(mongoose.disconnect);
beforeEach(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/checking');
});

/* Closing database connection after each test. */
afterEach(async () => {
  //   await UserModel.deleteMany();

  disconnectDBForTesting();
});

const app = createServer();

describe;
test('POST /register', async () => {
  const data = {
    name: 'Malt',
    email: 'malt@mail.com',
    password: 'Blog1',
    confirmPassword: 'Blog1',
  };

  await supertest(app).post('/register').send(data).expect(201);
});

test('POST /login', async () => {
  const data = {
    email: 'malt@mail.com',
    password: 'Blog1',
  };

  await supertest(app).post('/login').send(data).expect(200);
});

test('POST /login', async () => {
  const data = {
    email: 'mal@mail.com',
    password: 'Blog1',
  };

  await supertest(app).post('/login').send(data).expect(422);
});
