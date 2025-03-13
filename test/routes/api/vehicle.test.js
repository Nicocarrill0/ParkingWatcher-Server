import { test } from 'node:test';
import * as assert from 'node:assert';
import { StatusCodes } from 'http-status-codes';

import { build } from '../../helper.js';

test('/api/vehicle', async (t) => {
  const app = await build(t);

  await t.test('POST /vehicle', async (t) => {
    await t.test('returns bad request if required fields are missing', async (t) => {
      const response = await app.inject().post('/api/user/vehicle').payload({
        // Missing required fields like license or make this on pupose
        model: 'CX-5',
        year: '2018',
        type: 'SUV',
        color: 'Blue'
      });

      assert.deepStrictEqual(response.statusCode, StatusCodes.BAD_REQUEST);
    });

    await t.test('returns ok if vehicle is successfully uploaded', async (t) => {
      const response = await app.inject().post('/api/user/vehicle').payload({
        license: '8EIS147',
        make: 'Mazda',
        model: 'CX-5',
        year: '2018',
        type: 'SUV',
        color: 'Blue'
      });
      assert.deepStrictEqual(response.statusCode, StatusCodes.OK);
      console.log(response.body);

      const data = await response.json();
      assert.deepStrictEqual(data, {
        message: 'Vehicle uploaded successfully!',
        vehicle: {
          id: data.vehicle.id,
          license: '8EIS147',
          make: 'Mazda',
          model: 'CX-5',
          year: '2018',
          type: 'SUV',
          color: 'Blue'
        }
      });
    });
  });
});
