import { beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';

beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'test_access_secret_12345';
  process.env.JWT_REFRESH_SECRET = 'test_refresh_secret_12345';

  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/papeleria_test';
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoUri);
  }
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
});
