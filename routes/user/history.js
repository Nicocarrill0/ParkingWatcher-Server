export default async function (fastify, opts) {
    fastify.get('/history', async function (request, reply) {
        return { message: 'history route is working!' };
    });
}
