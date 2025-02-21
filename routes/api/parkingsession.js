import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

export default async function (fastify, opts) {
  fastify.post('/parkingsession',
    {
      schema: {
        description: 'Posts parked sesion',
        querystring: z.object({
          id: z.string(),
          userID: z.string(),
          vehicleID: z.string(),
          parkingSpot: z.string(),
          streetID: z.string(), // refferencing street ?
          createdAt: z.string(),
          updatedAt: z.string(),

        }),
      },
      response: {
        [StatusCodes.OK]: z.array(z.object({
          id: z.string(),
          parkingSpot: z.string(),
          streetID: z.string(),
          createdAt: z.string(),
          updatedAt: z.string(),

        }))
      }
    },
    async function (request, reply) {
      // const { q, type, emergency, pricemin, pricemax } = request.query;

      return { message: 'Preferences route is working!' };
    });
}
