import mongoose, { ConnectOptions } from 'mongoose';
import supertest from 'supertest';
import dotenv from 'dotenv';

import { UserModel } from '../../models/userModel';
import { disconnectDBForTesting, connectDBforTesting, createServer } from './../utilis';
dotenv.config();
const app = createServer();

beforeAll(async () => {
  await mongoose.disconnect();
});

beforeEach(async () => {
  await connectDBforTesting();
});

describe('check register functionality', () => {
  afterAll(async () => {
    await UserModel.deleteMany();
    await disconnectDBForTesting();
    await mongoose.disconnect();
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
});
