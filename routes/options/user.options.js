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
                fullName: { type: 'string', minLength: 3, maxLength: 255 },
                username: { type: 'string', minLength: 3, maxLength: 255 },
                password: { type: 'string', minLength: 3 },
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

//Logga in användare
module.exports.loginUserOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['username', 'password'],
            properties: {
                username: { type: 'string' },
                password: { type: 'string' },
            },
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    loggedInUser: {
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
    handler: userController.loginUser,
};

//Logga ut användare
module.exports.logoutUserOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                },
            },
        },
    },
    handler: userController.logoutUser,
};

//Uppdatera
module.exports.updateUserOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                fullName: { type: 'string', minLength: 3, maxLength: 255 },
                username: { type: 'string', minLength: 3, maxLength: 255 },
                password: { type: 'string' },
            },
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    updatedUser: {
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
    handler: userController.updateUser,
};

//Radera
module.exports.deleteUserOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    deletedUser: {
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
    handler: userController.deleteUser,
};
