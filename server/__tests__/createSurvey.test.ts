import supertest from 'supertest';
import { SurveyModel } from '../models/surveyModel';
import { UserModel } from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose, { ConnectOptions } from 'mongoose';

import { disconnectDBForTesting, connectDBforTesting } from './utilis';
import { app } from '../';
beforeAll(mongoose.disconnect); // Golden line !!

beforeAll(async () => {
  const testDBUrl = 'mongodb://127.0.0.1:27017/testingBE';
  await mongoose.connect(testDBUrl);
});
afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await UserModel.deleteMany({});
    await SurveyModel.deleteMany({});
    // await Blog.deleteMany({});
    await mongoose.connection.close();
  }
});
describe('should create a new survey', () => {
  test('should allow authenicated users to create survey', async () => {
    const password = await bcrypt.hash('Blog1', 10);
    const user = new UserModel({
      name: 'jil',
      email: 'jil@mail.com',
      password,
      confirmPassword: password,
    });
    const user1 = await user.save();

    const token = jwt.sign({ id: user1._id }, 'secret_key');

    const survey = {
      name: 'Test Survey 2',
      questions: [
        {
          text: 'First question text',
          choiceType: 'multi-choice',
          answerOptions: [
            {
              text: 'First answer',
            },
            {
              text: 'Second answer',
            },
          ],
        },
        {
          text: 'Second question text',
          choiceType: 'range',
        },
      ],
    };

    const res = await supertest(app).post('/survey').send(survey).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('Test Survey 2');
    expect(res.body.questions).toHaveLength(2);
  });
  test('should handle validation errors and return 422 status with an error message', async () => {
    const password = await bcrypt.hash('Blog1', 10);
    const user = new UserModel({
      name: 'jo',
      email: 'jo@mail.com',
      password,
      confirmPassword: password,
    });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY || 'secret_key');

    // Invalid survey data with missing required fields
    const invalidSurvey = {
      userId: user._id,
      name: '', // Invalid name to trigger validation error
      questions: [
        {
          text: 'First question text',
          choiceType: 'multi-choice',
          answerOptions: [
            {
              text: 'First answer',
            },
            {
              text: 'Second answer',
            },
          ],
        },
        {
          text: 'Second question text',
          choiceType: 'range',
        },
      ],
    };

    const res = await supertest(app).post('/survey').send(invalidSurvey).set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(422);
    expect(res.body).toEqual({ message: expect.any(String) });
  });

  test('should DELETE survey', async () => {
    const password = await bcrypt.hash('Blog1', 10);
    const user = new UserModel({
      name: 'jil',
      email: 'jil@mail.com',
      password,
      confirmPassword: password,
    });
    const user1 = await user.save();

    const token = jwt.sign({ id: user1._id }, 'secret_key');

    const survey = {
      name: 'Test Survey 2',
      questions: [
        {
          text: 'First question text',
          choiceType: 'multi-choice',
          answerOptions: [
            {
              text: 'First answer',
            },
            {
              text: 'Second answer',
            },
          ],
        },
        {
          text: 'Second question text',
          choiceType: 'range',
        },
      ],
    };

    const response = await supertest(app).post('/survey').send(survey).set('Authorization', `Bearer ${token}`);
    expect(response.body).toHaveProperty('_id');

    const res = await supertest(app).delete(`/survey/${response.body._id}`).set('Authorization', `Bearer ${token}`);
  });
});
