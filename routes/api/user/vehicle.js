export default async function (fastify, opts) {
  fastify.post('/cars', {
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
          color: { type: 'string' }
        }
      }
    }
  }, async function (request, reply) {
    const carId = 'example-id';

    return { message: 'Car created successfully!', carId };
  });
}
