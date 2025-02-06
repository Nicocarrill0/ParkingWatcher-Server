import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

export default async function (fastify, opts) {
  fastify.post('/signup', {
    schema: {
      body: z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        password: z.string(),
        confirmPassword: z.string(),
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
    handler: async function (request, reply) { // Added 'handler' here
      const { Email, Password } = request.body;

      return { message: 'Sign-Up route is working!' };
    }
  });
}
