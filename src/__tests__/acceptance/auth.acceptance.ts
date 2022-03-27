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
});
