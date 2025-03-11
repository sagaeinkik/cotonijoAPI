'use strict';

const userController = require('../../controllers/user.controller');
const pwHandler = require('../../utils/passwordHandler');

//Alla användare
module.exports.getAllUsersOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        fullName: { type: 'string' },
                        username: { type: 'string' },
                        registered: { type: 'string', format: 'date-time' },
                    },
                },
            },
        },
    },
    handler: userController.getAllUsers,
};

//Användare baserat på ID
module.exports.getUserByIdOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    fullName: { type: 'string' },
                    username: { type: 'string' },
                    registered: { type: 'string', format: 'date-time' },
                },
            },
        },
    },
    handler: userController.getUserById,
};

//Skapa ny användare
module.exports.addUserOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['fullName', 'username', 'password'],
            properties: {
                fullName: { type: 'string' },
                username: { type: 'string' },
                password: { type: 'string' },
            },
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    newUser: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            fullName: { type: 'string' },
                            username: { type: 'string' },
                            registered: { type: 'string', format: 'date-time' },
                        },
                    },
                },
            },
        },
    },
    handler: userController.addUser,
};

//Uppdatera

//Radera
