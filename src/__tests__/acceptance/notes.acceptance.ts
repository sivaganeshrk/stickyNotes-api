import {Client} from '@loopback/testlab';
import {StickyNotesApplication} from '../..';
import {setupApplication} from './test-helper';

describe('Notes', () => {
  let app: StickyNotesApplication;
  let client: Client;

  const note_uuid = 'c5e7f210-01e3-4ec4-b75b-74d1d14c6aa8';
  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('Notes - Create', async () => {
    await client
      .post('/api/v1/note')
      .set({
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfdXVpZCI6ImM3ODExMjViLTMzZDQtNDIwNC1iMGFlLTIzMGM2OWZmMmZhMSJ9LCJpYXQiOjE2NDgzNzkwNDksImV4cCI6MTY1MDEwNzA0OX0.6Q2aVze52zqJVaAMDZxnnn-4tLJB85dUgtGER0kKFGA',
      })
      .send({title: 'Test App', body: 'Test Data'})
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  it('Notes - Get', async () => {
    await client
      .get(`/api/v1/note?note_uuid=${note_uuid}`)
      .set({
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfdXVpZCI6ImM3ODExMjViLTMzZDQtNDIwNC1iMGFlLTIzMGM2OWZmMmZhMSJ9LCJpYXQiOjE2NDgzNzkwNDksImV4cCI6MTY1MDEwNzA0OX0.6Q2aVze52zqJVaAMDZxnnn-4tLJB85dUgtGER0kKFGA',
      })
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  it('Notes - Update', async () => {
    await client
      .put(`/api/v1/note?note_uuid=${note_uuid}`)
      .set({
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfdXVpZCI6ImM3ODExMjViLTMzZDQtNDIwNC1iMGFlLTIzMGM2OWZmMmZhMSJ9LCJpYXQiOjE2NDgzNzkwNDksImV4cCI6MTY1MDEwNzA0OX0.6Q2aVze52zqJVaAMDZxnnn-4tLJB85dUgtGER0kKFGA',
      })
      .send({title: 'Test App', body: 'Test Data'})
      .expect(204);
  });

  it('Notes - Delete', async () => {
    await client
      .del(`/api/v1/note?note_uuid=${note_uuid}`)
      .set({
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfdXVpZCI6ImM3ODExMjViLTMzZDQtNDIwNC1iMGFlLTIzMGM2OWZmMmZhMSJ9LCJpYXQiOjE2NDgzNzkwNDksImV4cCI6MTY1MDEwNzA0OX0.6Q2aVze52zqJVaAMDZxnnn-4tLJB85dUgtGER0kKFGA',
      })
      .expect(204);
  });

  it('Notes - get All', async () => {
    await client
      .get('/api/v1/notes')
      .set({
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfdXVpZCI6ImM3ODExMjViLTMzZDQtNDIwNC1iMGFlLTIzMGM2OWZmMmZhMSJ9LCJpYXQiOjE2NDgzNzkwNDksImV4cCI6MTY1MDEwNzA0OX0.6Q2aVze52zqJVaAMDZxnnn-4tLJB85dUgtGER0kKFGA',
      })
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});
