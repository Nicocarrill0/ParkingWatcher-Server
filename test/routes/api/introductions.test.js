import { test } from 'node:test';
import * as assert from 'node:assert';
import { StatusCodes } from 'http-status-codes';

import { build } from '../../helper.js';

test('/api/introductions', async (t) => {
  const app = await build(t);

  await t.test('POST /request', async (t) => {
    await t.test('returns not found if userId not found', async (t) => {
      const response = await app.inject().post('/introductions/request').payload({
        userId: '',
        companyId: '',
      });
      assert.deepStrictEqual(response.statusCode, StatusCodes.NOT_FOUND);
    });

    await t.test('returns ok with request data', async (t) => {
      const response = await app.inject().post('/introductions/request').payload({
        userId: '555740af-17e9-48a3-93b8-d5236dfd2c29',
        companyId: 'cd5ca076-1de3-4de0-913b-99845154be6d',
      });
      assert.deepStrictEqual(response.statusCode, StatusCodes.OK);

      const data = await response.json();
      assert.deepStrictEqual(data, {
        message: 'Request submitted successfully!',
        request: {
          id: data.request.id,
          userId: '555740af-17e9-48a3-93b8-d5236dfd2c29',
          firstName: 'John',
          lastName: 'Doe',
          category: 'Test',
          companyName: 'Harper Real Estate',
          requestDate: data.request.requestDate
        }
      });
    });
  });
});
