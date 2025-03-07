import { test } from 'node:test';
import * as assert from 'node:assert';
import { StatusCodes } from 'http-status-codes';

import { build } from '../../helper.js';

test('/api/signup', async (t) => {
  const app = await build(t);

  await t.test('POST /signup', async (t) => {
    await t.test('returns bad request if required fields are missing', async (t) => {
      const response = await app.inject().post('/api/user/signup').payload({
      });

      assert.deepStrictEqual(response.statusCode, StatusCodes.BAD_REQUEST);
    });

    await t.test('returns bad request if passwords do not match', async (t) => {
      const response = await app.inject().post('/api/user/signup').payload({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        password: 'test',
        confirmPassword: 'differentpassword',
      });

      assert.deepStrictEqual(response.statusCode, StatusCodes.BAD_REQUEST);
    });

    await t.test('returns ok with user data on success', async (t) => {
      const response = await app.inject().post('/api/user/signup').payload({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        password: 'test',
        confirmPassword: 'test',
      });

      assert.deepStrictEqual(response.statusCode, StatusCodes.OK);

      const data = await response.json();
      assert.deepStrictEqual(data, {
        userId: data.userId,
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
      });
    });
  });
});
