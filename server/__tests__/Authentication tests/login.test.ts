import supertest from 'supertest';
import { UserModel } from '../../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { DecodedJwtPayload } from '../Interfaces';
import { createServer, disconnectDBForTesting, connectDBforTesting } from './register.test';
import dotenv from 'dotenv';
dotenv.config();

const app = createServer();
beforeAll(async () => {
  await disconnectDBForTesting();
});

beforeEach(async () => {
  await connectDBforTesting();
});

describe('check login functionality', () => {
  afterAll(async () => {
    await UserModel.deleteMany();
    await disconnectDBForTesting();
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

  test('should verify the access token with the secret key', async () => {
    const password = await bcrypt.hash('Blog1', 10);
    const user = await UserModel.create({
      name: 'User',
      email: 'user@mail.com',
      password,
      confirmPassword: password,
    });
    const response = await supertest(app).post('/login').send({
      email: 'user@mail.com',
      password: 'Blog1',
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('accessToken');
    const decoded = jwt.verify(response.body.accessToken, process.env.SECRET_KEY || 'secret_key');
    expect((decoded as DecodedJwtPayload).id).toBeTruthy();
    expect((decoded as DecodedJwtPayload).id).toEqual(user._id.toString());
  });
});
