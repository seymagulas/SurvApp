import supertest from 'supertest';
import { UserModel } from '../../models/userModel';
import bcrypt from 'bcrypt';
import mongoose, { ConnectOptions } from 'mongoose';
import jwt from 'jsonwebtoken';
import { DecodedJwtPayload } from '../interfaces';

import dotenv from 'dotenv';

import { disconnectDBForTesting, connectDBforTesting, createServer } from '../utilis';
dotenv.config();

const app = createServer();

beforeAll(async () => {
  await mongoose.disconnect();
});

describe('check login functionality', () => {
  beforeAll(async () => {
    await connectDBforTesting();
  });
  afterAll(async () => {
    await UserModel.deleteMany();
    await disconnectDBForTesting();
    await mongoose.disconnect();
  });

  test('login with proper credentials & return an access token', async () => {
    const password = await bcrypt.hash('Blog1', 10);
    const user = new UserModel({
      name: 'User',
      email: 'user@mail.com',
      password,
      confirmPassword: password,
    });
    await user.save();

    const data = {
      email: 'user@mail.com',
      password: 'Blog1',
    };
    await supertest(app)
      .post('/login')
      .send(data)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).toHaveProperty('accessToken');
        expect(typeof res.body.accessToken).toBe('string');
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
      .expect(422)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).toHaveProperty('message', 'Username or password is not correct.');
      });
  });

  test('should return a server error when an error occurs during login', async () => {
    jest.spyOn(UserModel, 'findOne').mockRejectedValueOnce(null);

    await supertest(app)
      .post('/login')
      .send({
        email: 'edward@example.com',
        password: 'password123',
      })
      .expect(500)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).toHaveProperty('message', 'Server error');
      });
  });

  test('should verify the access token with the secret key', async () => {
    const password = await bcrypt.hash('Blog1', 10);
    const user = await UserModel.create({
      name: 'jack',
      email: 'jack@mail.com',
      password,
      confirmPassword: password,
    });
    const response = await supertest(app).post('/login').send({
      email: 'jack@mail.com',
      password: 'Blog1',
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('accessToken');
    const decoded = jwt.verify(response.body.accessToken, process.env.SECRET_KEY || 'secret_key');
    expect((decoded as DecodedJwtPayload).id).toBeTruthy();
    expect((decoded as DecodedJwtPayload).id).toEqual(user._id.toString());
  });
});
