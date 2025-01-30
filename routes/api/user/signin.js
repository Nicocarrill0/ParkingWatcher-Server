import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

export default async function (fastify, opts) {
  fastify.post('/signin', {
    schema: {
      body: z.object({
        email: z.string(),
        password: z.string(),
      }),
      response: {
        [StatusCodes.OK]: z.object({
          userId: z.string(),
          firstName: z.string(),
          lastName: z.string(),
          email: z.string(),
        })
      }
    },
    handler: async function (request, reply) { // Changed function placement to 'handler'
      const { email, password } = request.body;

      return { message: 'Sign-In route is working!' };
    }
  });
}
