export default async function (fastify, opts) {
    fastify.post('/signin', async function (request, reply) {
        return { message: 'Sign-in route is working!' };
    });
}
