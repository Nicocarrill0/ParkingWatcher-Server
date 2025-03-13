import { StatusCodes } from 'http-status-codes';

export default async function (fastify, opts) {
  fastify.post('/vehicle', {
    schema: {
      body: {
        type: 'object',
        required: ['license', 'make', 'model', 'year', 'type', 'color'],
        properties: {
          license: { type: 'string' },
          make: { type: 'string' },
          model: { type: 'string' },
          year: { type: 'string' },
          type: { type: 'string' },
          color: { type: 'string' },
        },
      },
    },
    handler: async function (request, reply) {
      try {
        const { license, make, model, year, type, color } = request.body;

        if (!license || !make || !model || !year || !type || !color) {
          return reply.status(StatusCodes.BAD_REQUEST).send();
        }

        const vehicle = await fastify.prisma.vehicle.create({
          data: {
            license,
            make,
            model,
            year,
            type,
            color
          },
        });

        return reply.status(StatusCodes.OK).send({
          message: 'Vehicle uploaded successfully!',
          vehicle,
        });
      } catch (error) {
        console.error('Vehicle Upload Error:', error);
        return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
      }
    },
  });
}
