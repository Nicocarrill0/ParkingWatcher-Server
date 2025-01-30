export default async function (fastify, opts) {
    fastify.post('/signin',{
        schema: {
            body: {
                type: 'object',
                required: ['FirstName', 'LastName', 'Email', 'Password', 'ConfirmPassword'],
                properties: {
                    FirstName: { type: 'string' },
                    LastName: { type: 'string' },
                    Email: { type: 'string' },
                    Password: { type: 'string' },
                    ConfirmPassword: { type: 'string' }
                }
            }
        }
}, async function (request, reply) {
        return { message: 'Sign-in route is working!' };
    });
}
