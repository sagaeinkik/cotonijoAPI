'use strict';

const { authenticateToken } = require('../utils/passwordHandler');

async function authRoutes(fastify) {
    //Route för att kontrollera om en användare är inloggad öht
    fastify.get('/auth/me', { preHandler: authenticateToken }, async (request, reply) => {
        reply.send({ loggedIn: true, username: request.username });
    });
}

module.exports = authRoutes;
