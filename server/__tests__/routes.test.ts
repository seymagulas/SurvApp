import mongoose from 'mongoose';
import supertest from 'supertest';
import dotenv from 'dotenv';
import cors from 'cors';
import { router } from '../router';
import express, { Express, Request, Response } from 'express';
import { UserModel } from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface DecodedJwtPayload {
  id: string;
  // Add other properties from your JWT payload if needed
  [key: string]: any; // Allow any additional properties
}
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
// afterEach(async () => {
//   await UserModel.deleteMany();

//   disconnectDBForTesting();
// });

const app = createServer();

describe('check for login and register functionality', () => {
  afterAll(async () => {
    await UserModel.deleteMany();
    disconnectDBForTesting();
  });
  test('register a user', async () => {
    const data = {
      name: 'Mark',
      email: 'mark@mail.com',
      password: 'Blog1',
      confirmPassword: 'Blog1',
    };

    await supertest(app)
      .post('/register')
      .send(data)

      .then(async (response) => {
        expect(response.status).toBe(201);
        expect(response.body).toEqual({});
      });
  });

  test('register should return an error for an existing email', async () => {
    // Insert a user with the same email into the test database
    await UserModel.create({
      name: 'Marko',
      email: 'marko@mail.com',
      password: 'Blog2',
    });

    const response = await supertest(app).post('/register').send({
      name: 'Test User',
      email: 'marko@mail.com',
      password: 'testpassword',
      confirmPassword: 'testpassword',
    });

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('message', 'Please make sure the correct email address is entered.');
  });

  test('login with proper credentials & return an access token', async () => {
    const data = {
      email: 'mark@mail.com',
      password: 'Blog1',
    };

    await supertest(app)
      .post('/login')
      .send(data)
      .then(async (response) => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('accessToken');
        expect(typeof response.body.accessToken).toBe('string');
      });
  });

  test('login should return an error for invalid credentials', async () => {
    const data = {
      email: 'mal@mail.com',
      password: 'Blog1',
    };
    await supertest(app)
      .post('/login')
      .send(data)
      .then(async (response) => {
        expect(response.status).toBe(422);
        expect(response.body).toHaveProperty('message', 'Username or password is not correct.');
      });
  });

  test('login should return a server error for an unexpected exception', async () => {
    jest.spyOn(UserModel, 'findOne').mockImplementationOnce(() => {
      throw new Error('Unexpected exception');
    });

    const response = await supertest(app).post('/login').send({
      email: 'mark@mail.com',
      password: 'Blog1',
    });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Server error');
  });

  test('POST /api/login should return an access token', async () => {
    const password = await bcrypt.hash('testpassword', 10);
    const user = await UserModel.create({
      name: 'Test User',
      email: 'testuser@example.com',
      password,
      confirmPassword: password,
    });

    const response = await supertest(app).post('/login').send({
      email: 'testuser@example.com',
      password: 'testpassword',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('accessToken');

    const decoded = jwt.verify(response.body.accessToken, process.env.SECRET_KEY || 'secret_key');

    expect((decoded as DecodedJwtPayload).id).toEqual(user._id.toString());
  });
});
