export default async function (fastify, opts) {
  fastify.get('/history', {
    schema: {
      // body: {
      //   type: 'object',
      //   required: ['id', 'userId', 'vehicleID', 'parkingSpotID', 'durationLimit', 'createdAt', 'updatedAt'],
      //   properties: {
      //     id: { type: 'string' },
      //     userId: { type: 'string' },
      //     vehicleID: { type: 'string' },
      //     parkingSpotID: { type: 'string' },
      //     durationLimit: { type: 'int' },
      //     createdAt: { type: 'string' },
      //     updatedAt: { type: 'string' }, // because if the date is close I want to be able to say days of the week and months (so string)
      //
      //   }
      // }
    }
  }, async function (request, reply) {
    return { message: 'history route is working!' };
  });
}

// we can gather parking spot information and then have it get information about the street in back end

// model ParkingSession {
//     id             String   @id @default(uuid())
//     userID         String
//     vehicleID      String
//     parkingSpotID  String
//
//
//     vehicle     Vehicle     @relation(fields: [vehicleID], references: [id])
//     parkingSpot ParkingSpot @relation(fields: [parkingSpotID], references: [id])
// }

// return

// id             String   @id @default(uuid())
// userID         String
// vehicleID      String
// parkingSpotID  String
// durationLimit  Int
// createdAt    DateTime @default(now())
// updatedAt    DateTime @updatedAt
