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
        const { license, make, model, year, type, color } = request.body;

        const carId = 'example-id';

        return { message: 'Car created successfully!', carId };
    });
}


//model Vehicle {
//   id           String   @id @default(uuid())
//   userID       String
//   licensePlate BigInt   @unique
//   make         String
//   model        String
//   type         String
//   year         String
//   color        String
//   createdAt    DateTime @default(now())
//   updatedAt    DateTime @updatedAt
//
//   user            User             @relation(fields: [userID], references: [id])
//   parkingSessions ParkingSession[]
// }