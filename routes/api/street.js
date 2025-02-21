import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

export default async function (fastify, opts) {
  fastify.get('/street',
    {
      schema: {
        description: 'Returns current streets in the parameter',
        querystring: z.object({
          latitude: z.number().optional(),
          longitude: z.number().optional(),
          // distance

        }),
      },
      response: {
        [StatusCodes.OK]: z.array(z.object({
          id: z.string(),
          neighborhood: z.string(),
          days: z.string(),
          startTime: z.string(),
          endTime: z.string(),
          durationLimit: z.string(),
          shape: z.string(),
        }))
      }
    },
    async function (request, reply) {
      // read prisma documentation


      const readStreet = await fastify.prisma.street.findMany({

        take: 100

      });

      return readStreet;
    });
}
