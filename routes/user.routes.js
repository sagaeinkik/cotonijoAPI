'use strict';

const { getAllUsersOpts, getUserByIdOpts, addUserOpts } = require('./options/user.options');

async function userRoutes(fastify) {
    fastify.get('/users', getAllUsersOpts);
    fastify.get('/users/:id', getUserByIdOpts);
    fastify.post('/signup', addUserOpts);
}

module.exports = userRoutes;
