export default async function (fastify, opts) {
    fastify.patch('/:id/preferences', async function (request, reply) {

        const {  Price, ParkingLimit, ParkingType, Amenities, RadiusLimit } = request.query;

    return { message: 'Preferences route is working!' };
    })
}

// unsure how to structure

// curl -X PATCH "http://localhost:3000/user/123/preferences?Price=100&ParkingLimit=2&ParkingType=Garage&Amenities=EV%20Charging,Covered%20Parking&RadiusLimit=5"