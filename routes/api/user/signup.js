export default async function (fastify, opts) {
  fastify.post('/signup', {
    schema: {
      body: {
        type: 'object',
        required: ['FirstName', 'LastName', 'Email', 'Password', 'ConfirmPassword'],
        properties: {
          FirstName: { type: 'string' },
          LastName: { type: 'string' },
          Email: { type: 'string', format: 'email' },
          Password: { type: 'string', minLength: 8 },
          ConfirmPassword: { type: 'string', minLength: 8 }
        }
      }
    }
  }, async function (request, reply) {
    const { FirstName, LastName, Email, Password, ConfirmPassword } = request.body;

    // confirming password match
    if (Password !== ConfirmPassword) {
      return reply.code(400).send({ error: 'Passwords do not match' });
    }

    // Hash password (use bcrypt or another hashing library) (chatgpt)
    const hashedPassword = await fastify.bcrypt.hash(Password);

    // Store user in database (example) (chat)
    const newUser = {
      FirstName,
      LastName,
      Email,
      Password: hashedPassword // Store hashed password, NOT the plain text one
    };

    // Example: Insert into DB (replace with actual DB call) (chat)
    // await db.collection('users').insertOne(newUser); (chat)

    return reply.code(201).send({ message: 'User successfully registered!' });
  });
}
