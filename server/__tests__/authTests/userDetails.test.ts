import supertest from 'supertest';

import { UserModel } from '../../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose, { ConnectOptions } from 'mongoose';

import { app } from '../..';
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
describe('check user details', () => {
  test('should return user details when authenticated', async () => {
    const password = await bcrypt.hash('Blog1', 10);
    const user = new UserModel({
      name: 'jil',
      email: 'jil@mail.com',
      password,
      confirmPassword: password,
    });
    const user1 = await user.save();

    const token = jwt.sign({ id: user1._id }, 'secret_key');

    const response = await supertest(app).get('/user').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      _id: expect.any(String),
      name: 'jil',
      email: 'jil@mail.com',
    });
  });
});
