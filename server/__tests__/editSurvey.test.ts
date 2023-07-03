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
describe('should Edit  survey', () => {
  test('should Edit survey', async () => {
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

    const surveyEdit = {
      name: 'Test 2',
      questions: [
        {
          text: 'Second text',
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

    const res = await supertest(app).put(`/survey/${response.body._id}`).send(surveyEdit).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
});
