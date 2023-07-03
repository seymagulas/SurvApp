import supertest from 'supertest';
import { SurveyModel } from '../models/surveyModel';
import { UserModel } from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose, { ConnectOptions } from 'mongoose';

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
describe('should retrieve all surveys', () => {
  test('should retrieve survey', async () => {
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

    const survey = new SurveyModel({
      userId: user1._id,
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
    });

    const survey1 = await survey.save();

    // const res = await supertest(app).post('/survey').send(survey).set('Authorization', `Bearer ${token}`);
    // expect(res.status).toBe(201);

    // expect(res.body.name).toBe('Test Survey 2');
    // expect(res.body.questions).toHaveLength(2);

    const allSurveys = await supertest(app).get('/survey').set('Authorization', `Bearer ${token}`);

    expect(allSurveys.status).toBe(200);
    expect(allSurveys.body).toHaveLength(1); // Check if there is one survey
    expect(allSurveys.body[0]).toHaveProperty('_id'); // Check if the survey object has the _id property
    expect(allSurveys.body[0].name).toBe('Test Survey 2'); // Check the name of the survey
    expect(allSurveys.body[0].questions).toHaveLength(2); // Check the number of questions in the survey
  });
});
