import supertest from 'supertest';
import mongoose, { ConnectOptions } from 'mongoose';
import { UserModel } from '../../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { disconnectDBForTesting, connectDBforTesting, createServer } from './../utilis';
import dotenv from 'dotenv';

dotenv.config();

const app = createServer();
beforeAll(async (): Promise<void> => {
  await mongoose.disconnect();
});

describe('check middleware functionality', (): void => {
  beforeAll(async () => {
    await connectDBforTesting();
  });
  afterAll(async () => {
    await UserModel.deleteMany();
    await disconnectDBForTesting();
    await mongoose.disconnect();
  });

  test('should return 403 if no authorization header is provided', async (): Promise<void> => {
    const response = await supertest(app).get('/user');
    expect(response.status).toBe(403);
  });

  test('should return 401 if an invalid token is provided', async (): Promise<void> => {
    const response = await supertest(app).get('/user').set('Authorization', 'Bearer invalidToken');
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Please authenticate');
  });

  test('should return 200 if a valid token is provided', async (): Promise<void> => {
    const password = await bcrypt.hash('Blog1', 10);
    const user = await UserModel.create({
      name: 'User',
      email: 'user@mail.com',
      password,
      confirmPassword: password,
    });
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY || 'secret_key');

    const response = await supertest(app).get('/user').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
