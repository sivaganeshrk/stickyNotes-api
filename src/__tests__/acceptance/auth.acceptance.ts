import {Client} from '@loopback/testlab';
import {StickyNotesApplication} from '../..';
import {Shortid} from '../../utils';
import {setupApplication} from './test-helper';

describe('Auth', () => {
  let app: StickyNotesApplication;
  let client: Client;
  const email_address = `${Shortid()}@test.com`;
  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('Register - Success', async () => {
    await client
      .post('/api/v1/auth/register')
      .send({email_address: email_address, password: '1234567890'})
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  it('Register - Email Already Exists', async () => {
    await client
      .post('/api/v1/auth/register')
      .send({email_address: email_address, password: '1234567890'})
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  it('Register - min lenth', async () => {
    await client
      .post('/api/v1/auth/register')
      .send({email_address: email_address, password: '1234'})
      .expect(422)
      .expect('Content-Type', /application\/json/);
  });

  it('Login - Success', async () => {
    await client
      .post('/api/v1/auth/login')
      .send({email_address: email_address, password: '1234567890'})
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  it('Login - Invalid Email', async () => {
    await client
      .post('/api/v1/auth/login')
      .send({email_address: 'dummyTest@test.com', password: '1234567890'})
      .expect(404)
      .expect('Content-Type', /application\/json/);
  });

  it('Login - wrong password', async () => {
    await client
      .post('/api/v1/auth/login')
      .send({email_address: email_address, password: '12345670'})
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });

  it('Profile - Success', async () => {
    await client
      .get('/api/v1/auth/profile')
      .set({
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfdXVpZCI6ImM3ODExMjViLTMzZDQtNDIwNC1iMGFlLTIzMGM2OWZmMmZhMSJ9LCJpYXQiOjE2NDgzNzkwNDksImV4cCI6MTY1MDEwNzA0OX0.6Q2aVze52zqJVaAMDZxnnn-4tLJB85dUgtGER0kKFGA',
      })
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  it('Profile - Without Header', async () => {
    await client
      .get('/api/v1/auth/profile')
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });
  it('Profile - Invalid Token', async () => {
    await client
      .get('/api/v1/auth/profile')
      .set({
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfdXVpZCI6ImM3MjViLTMzZDQtNDIwNC1iMGFlLTIzMGM2OWZmMmZhMSJ9LCJpYXQiOjE2NDgzNzkwNDksImV4cCI6MTY1MDEwNzA0OX0.6Q2aVze52zqJVaAMDZxnnn-4tLJB85dUgtGER0kKFGA',
      })
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });
});
