'use strict';

const userController = require('../../controllers/user.controller');

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
                        email: { type: 'string' },
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
                    email: { type: 'string' },
                    username: { type: 'string' },
                    registered: { type: 'string', format: 'date-time' },
                },
            },
        },
    },
    handler: userController.getUserById,
};

//Användare baserat på användarnamn
module.exports.getUserByUsernameOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    fullName: { type: 'string' },
                    email: { type: 'string' },
                    username: { type: 'string' },
                    registered: { type: 'string', format: 'date-time' },
                },
            },
        },
    },
    handler: userController.getUserByUsername,
};

//Skapa ny användare
module.exports.addUserOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['fullName', 'email', 'username', 'password'],
            properties: {
                fullName: {
                    type: 'string',
                    minLength: 3,
                    maxLength: 255,
                    errorMessage: {
                        minLength: 'The full name must contain a minimum of 3 characters.',
                        maxLength: 'The full name cannot contain more than 255 characters.',
                    },
                },
                email: {
                    type: 'string',
                    format: 'email',
                    errorMessage: {
                        format: 'You must enter a valid email address.',
                    },
                },
                username: {
                    type: 'string',
                    minLength: 3,
                    maxLength: 255,
                    errorMessage: {
                        minLength: 'Username must contain a minimum of 3 characters.',
                        maxLength: 'Username cannot contain more than 255 characters.',
                    },
                },
                password: {
                    type: 'string',
                    minLength: 3,
                    errorMessage: { minLength: 'Password must contain a minimum of 3 characters.' },
                },
            },
            errorMessage: {
                required: {
                    fullName: 'You must enter your full name.',
                    email: 'You must enter an email.',
                    username: 'You must enter a username.',
                    password: 'You must enter a password.',
                },
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
                            email: { type: 'string' },
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
            errorMessage: {
                required: {
                    username: 'You must enter a username.',
                    password: 'You must enter a password.',
                },
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
                            email: { type: 'string' },
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
                fullName: {
                    type: 'string',
                    minLength: 3,
                    maxLength: 255,
                    errorMessage: 'The full name must be between 3 and 255 characters.',
                },
                email: {
                    type: 'string',
                    format: 'email',
                    errorMessage: {
                        format: 'You must enter a valid email address.',
                    },
                },
                username: {
                    type: 'string',
                    minLength: 3,
                    maxLength: 255,
                    errorMessage: 'The username must be between 3 and 255 characters.',
                },
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
                            email: { type: 'string' },
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
                            email: { type: 'string' },
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
