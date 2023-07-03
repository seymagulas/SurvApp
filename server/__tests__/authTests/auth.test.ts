import mongoose, { ConnectOptions } from 'mongoose';
import supertest from 'supertest';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { UserModel } from '../../models/userModel';
import { disconnectDBForTesting, connectDBforTesting, createServer } from '../utilis';
import { DecodedJwtPayload } from '../interfaces';
dotenv.config();
import { app } from '../..';
import jwt from 'jsonwebtoken';
beforeAll(mongoose.disconnect); // Golden line !!

beforeAll(async () => {
  const testDBUrl = 'mongodb://127.0.0.1:27017/testingBE';
  await mongoose.connect(testDBUrl);
});
afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await UserModel.deleteMany({});
    // await Blog.deleteMany({});
    await mongoose.connection.close();
  }
});
describe('check register & login functionality', () => {
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
    const response = await supertest(app).post('/register').send({
      name: 'John Doe',
      email: 'mark@mail.com',
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

  test('should return a server error when an error occurs during registration', async () => {
    const createMock = jest.spyOn(UserModel, 'create').mockImplementation(() => {
      console.log('Registration failed');
      return Promise.reject();
    });

    try {
      const response = await supertest(app).post('/register').send({
        name: 'Edward',
        email: 'edward@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Server error');
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      createMock.mockRestore();
    }
  });

  test('login with proper credentials & return an access token', async () => {
    const data = {
      name: 'Rob',
      email: 'rob@mail.com',
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

    const userData = {
      email: 'rob@mail.com',
      password: 'Blog1',
    };

    const response = await supertest(app)
      .post('/login')
      .send(userData)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).toHaveProperty('accessToken');
      });
    const decoded = jwt.verify(response.body.accessToken, 'secret_key');
    expect((decoded as DecodedJwtPayload).id).toBeTruthy();
  });
});
