import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

export default async function (fastify, opts) {
  fastify.get('/',
    {
      schema: {
        description: 'This is the demo root API endpoint',
        response: {
          [StatusCodes.OK]: z.object({
            root: z.boolean()
          }),
        },
      },
    },
    async function (request, reply) {
      return { root: true };
    });
}
