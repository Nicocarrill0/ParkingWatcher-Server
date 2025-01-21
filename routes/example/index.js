import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

export default async function (fastify, opts) {
  fastify.get('/',
    {
      schema: {
        description: 'This is example API endpoint',
        response: {
          [StatusCodes.OK]: z.string(),
        },
      },
    },
    async function (request, reply) {
      return 'this is an example';
    });
}
