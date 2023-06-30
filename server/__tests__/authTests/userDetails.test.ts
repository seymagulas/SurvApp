import supertest from 'supertest';

import { UserModel } from '../../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose, { ConnectOptions } from 'mongoose';

import { disconnectDBForTesting, connectDBforTesting, createServer } from './../utilis';
const app = createServer();
beforeAll(async () => {
  await mongoose.disconnect();
});

describe('check user details', () => {
  beforeAll(async () => {
    await connectDBforTesting();
    await UserModel.deleteMany();
  });
  afterAll(async () => {
    await UserModel.deleteMany();
    await disconnectDBForTesting();
    await mongoose.disconnect();
  });

  test('should return user details when authenticated', async () => {
    const password = await bcrypt.hash('Blog1', 10);
    const user = new UserModel({
      name: 'jil',
      email: 'jil@mail.com',
      password,
      confirmPassword: password,
    });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY || 'secret_key');

    const response = await supertest(app).get('/user').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      _id: expect.any(String),
      name: 'jil',
      email: 'jil@mail.com',
    });
  });
});
