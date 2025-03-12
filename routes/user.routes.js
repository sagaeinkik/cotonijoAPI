'use strict';

const {
    getAllUsersOpts,
    getUserByIdOpts,
    getUserByUsernameOpts,
    addUserOpts,
    loginUserOpts,
    logoutUserOpts,
    updateUserOpts,
    deleteUserOpts,
} = require('./options/user.options');

async function userRoutes(fastify) {
    fastify.get('/users', getAllUsersOpts); // Alla användare
    fastify.get('/users/:id', getUserByIdOpts); // Enskild användare
    fastify.get('/users/username/:username', getUserByUsernameOpts); // Enskild användare baserat på användarnamn
    fastify.post('/signup', addUserOpts); // Skapa ny
    fastify.post('/login', loginUserOpts); // Logga in
    fastify.post('/logout', logoutUserOpts); // Logga ut
    fastify.put('/users/:id', updateUserOpts); // Uppdatera
    fastify.delete('/users/:id', deleteUserOpts); // Ta bort
}

module.exports = userRoutes;
