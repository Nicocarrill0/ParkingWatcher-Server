export default async function (fastify, opts) {
    fastify.post('/signup', async function (request, reply) {
        return { message: 'Sign-up route is working!' };
    });
}
