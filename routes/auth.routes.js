'use strict';

const jwt = require('jsonwebtoken');
const jwtKey = process.env.JWT_SECRET_KEY;

async function authRoutes(fastify) {
    //Route för att kontrollera om en användare är inloggad öht
    fastify.get('/auth/me', { preHandler: authenticateToken }, async (request, reply) => {
        //Token ur cookie
        const token = request.cookies.jwt;

        if (!token) {
            return reply.send({ loggedIn: false });
        }
        try {
            const user = jwt.verify(token, jwtKey);
            return reply.send({ loggedIn: true, username: user.username });
        } catch (error) {
            return reply.send({ loggedIn: false }); // Samma här, ingen 401
        }
    });
}

module.exports = authRoutes;
