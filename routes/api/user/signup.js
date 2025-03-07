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
    handler: async function (request, reply) {
      const { firstName, lastName, email, password, confirmPassword } = request.body;

      if (password !== confirmPassword) {
        return reply.status(StatusCodes.UNAUTHORIZED).send();
      }

      const existingUser = await fastify.prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return reply.status(StatusCodes.CONFLICT).send({
          message: 'Email already exists',
        });
      }

      const user = await fastify.prisma.user.create({
        data: {
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@test.com',
        },
      });
      return reply.send({
        firstName,
        lastName,
        email,
        password,
      });
    }
  });
}
