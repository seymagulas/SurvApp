import mongoose, { ConnectOptions } from 'mongoose';
import supertest from 'supertest';
import dotenv from 'dotenv';
import cors from 'cors';
import { router } from '../../router';
import express, { Express, Request, Response } from 'express';
import { UserModel } from '../../models/userModel';

dotenv.config();

export function createServer() {
  const app: Express = express();
  app.use(cors({ origin: true }));
  app.use(express.json());
  app.use(router);
  return app;
}

export async function disconnectDBForTesting() {
  try {
    await mongoose.connection.close();
  } catch (error) {
    console.log('DB disconnect error');
  }
}

beforeAll(async () => {
  await disconnectDBForTesting();
});

export async function connectDBforTesting() {
  await mongoose.connect('mongodb://127.0.0.1:27017/tesb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);
}

beforeEach(async () => {
  await connectDBforTesting();
});

const app = createServer();

describe('check register functionality', () => {
  afterAll(async () => {
    await UserModel.deleteMany();
    await disconnectDBForTesting();
  });
  test('should register a new user', async () => {
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

  it('should return an error when the email address already exists', async () => {
    const existingUser = new UserModel({
      name: 'Marko',
      email: 'marko@mail.com',
      password: 'Blog2',
    });
    await existingUser.save();

    const response = await supertest(app).post('/register').send({
      name: 'John Doe',
      email: 'marko@mail.com',
      password: 'password123',
      confirmPassword: 'password123',
    });
    expect(response.status).toBe(422);
    expect(response.body.message).toBe('Please make sure the correct email address is entered.');
  });

  it('should return an error when the password and confirm password do not match', async () => {
    const response = await supertest(app).post('/register').send({
      name: 'Edward',
      email: 'edward@example.com',
      password: 'password123',
      confirmPassword: 'password456',
    });

    expect(response.status).toBe(422);
    expect(response.body.message).toBe('Password and confirm password do not match.');
  });

  it('should return an error when the password is empty', async () => {
    const response = await supertest(app).post('/register').send({
      name: 'Edward',
      email: 'edward@example.com',
      password: '',
      confirmPassword: '',
    });

    expect(response.status).toBe(422);

    expect(response.body.message).toBe('Password cannot be empty.');
  });

  it('should return a server error when an error occurs during registration', async () => {
    // Mock an error during registration by throwing an exception
    jest.spyOn(UserModel, 'create').mockImplementationOnce(() => {
      throw new Error('Registration failed');
    });

    const response = await supertest(app).post('/register').send({
      name: 'Edward',
      email: 'edward@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    });

    expect(response.status).toBe(500);

    expect(response.body.message).toBe('Server error');
  });
});
