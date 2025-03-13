import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';
import bcrypt from 'bcrypt';

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
          id: z.string(),
          firstName: z.string(),
          lastName: z.string(),
          email: z.string(),
        }),
      },
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

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await fastify.prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          hashedPassword,
        },
      });

      return reply.send(
        user
      );
    },
  });
}
