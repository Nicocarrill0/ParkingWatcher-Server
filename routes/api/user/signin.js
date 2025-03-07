import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';
import bcrypt from 'bcrypt';

export default async function (fastify, opts) {
  fastify.post('/signin', {
    schema: {
      body: z.object({
        email: z.string(),
        password: z.string(),
      }),
      response: {
        [StatusCodes.OK]: z.object({
          id: z.string(),
          firstName: z.string(),
          lastName: z.string(),
          email: z.string(),
        })
      }
    },
    handler: async function (request, reply) {
      const { email, password } = request.body;

      //! !!
      const user = await fastify.prisma.user.findUnique({
        where: { email },
      });

      if (user) {
        if (await bcrypt.compare(password, user.hashedPassword)) {
          return user;
        }
      }

      return reply.status(StatusCodes.UNAUTHORIZED).send();
    }
  });
}
