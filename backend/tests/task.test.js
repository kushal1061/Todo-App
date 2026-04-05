const mongoose = require('mongoose');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../src/app');
const Task = require('../src/models/Task');
const User = require('../src/models/User');

let mongoServer;
let token;
let userId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);

  // Register a mock user and get token for testing
  const authResponse = await request(app)
    .post('/api/auth/register')
    .send({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123'
    });

  token = authResponse.body.token;
  userId = authResponse.body._id;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    if (key === 'users') continue; // keep user for tests
    const collection = collections[key];
    await collection.deleteMany({});
  }
});

describe('Task API Endpoints secured via JWT', () => {

  test('POST /api/tasks - Create a new task securely', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Learn Node.js',
        description: 'Prepare for the internship interview',
        category: 'Study'
      });
    
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe('Learn Node.js');
    expect(response.body.completed).toBe(false);
    expect(response.body.user).toBe(userId);
  });

  test('POST /api/tasks - Should fail to create a task without token', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Unauthorized Task'
      });
    
    expect(response.statusCode).toBe(401);
  });

  test('GET /api/tasks - Retrieve all tasks for authorized user', async () => {
    await Task.create({ title: 'Task 1', user: userId });
    await Task.create({ title: 'Task 2', user: userId });

    const response = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
  });

  test('PATCH /api/tasks/:id/complete - Mark task as completed', async () => {
    const task = await Task.create({ title: 'Finish testing', user: userId });

    const response = await request(app)
      .patch(`/api/tasks/${task._id}/complete`)
      .set('Authorization', `Bearer ${token}`);
      
    expect(response.statusCode).toBe(200);
    expect(response.body.completed).toBe(true);
  });

  test('PUT /api/tasks/:id - Edit task details', async () => {
    const task = await Task.create({ title: 'Old Title', user: userId });

    const response = await request(app)
      .put(`/api/tasks/${task._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'New Title',
        description: 'New Description'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe('New Title');
    expect(response.body.description).toBe('New Description');
  });

  test('DELETE /api/tasks/:id - Delete a task', async () => {
    const task = await Task.create({ title: 'Delete me', user: userId });

    const response = await request(app)
      .delete(`/api/tasks/${task._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.task.title).toBe('Delete me');

    const checkTask = await Task.findById(task._id);
    expect(checkTask).toBeNull();
  });

});
