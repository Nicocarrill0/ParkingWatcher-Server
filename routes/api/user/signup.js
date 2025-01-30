export default async function (fastify, opts) {
    fastify.post('/signup',{
        schema: {
            body: {
                type: 'object',
                required: ['Email', 'Password'],
                properties: {
                    Email: { type: 'string' },
                    Password: { type: 'string' },
                }
            }
        }
    }, async function (request, reply) {
        return { message: 'Sign-Up route is working!' };
    });
}
