import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

export default async function (fastify, opts) {
  fastify.get('/street',
    {
      schema: {
        description: 'Returns current streets in the parameter',
        querystring: z.object({
          id: z.string(),
          neighborhood: z.string(),
          days: z.string(),
          startTime: z.string(),
          endTime: z.string(),
          durationLimit: z.string(),
          latitude: z.number(),
          longitude: z.number(),
          shape: z.string(),
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
      const { id, neighborhood, days, startTime, endTime, durationLimit, shape } = request.query;

      return { message: 'Preferences route is working!' };
    });
}

//     durationLimit String
//     latitude      Decimal
//     longitude     Decimal
//     shape         String
//
//     parkingSpots ParkingSpot[]
// }
