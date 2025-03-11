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
                fullName: {
                    type: 'string',
                    minLength: 3,
                    maxLength: 255,
                    errorMessage: {
                        minLength: 'Namnet måste innehålla minst 3 tecken.',
                        maxLength: 'Namnet får innehålla max 255 tecken.',
                    },
                },
                username: {
                    type: 'string',
                    minLength: 3,
                    maxLength: 255,
                    errorMessage: {
                        minLength: 'Användarnamnet måste innehålla minst 3 tecken.',
                        maxLength: 'Användarnamnet får innehålla max 255 tecken.',
                    },
                },
                password: {
                    type: 'string',
                    minLength: 3,
                    errorMessage: { minLength: 'Lösenordet måste innehålla minst 3 tecken.' },
                },
            },
            errorMessage: {
                required: {
                    fullName: 'Du måste ange ett namn',
                    username: 'Du måste ange ett användarnamn',
                    password: 'Du måste ange ett lösenord',
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
                username: { type: 'string', errorMessage: 'Du måste ange ett användarnamn.' },
                password: { type: 'string', errorMessage: 'Du måste ange ett lösenord.' },
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
                fullName: {
                    type: 'string',
                    minLength: 3,
                    maxLength: 255,
                    errorMessage: 'Namnet måste vara mellan 3 och 255 tecken långt.',
                },
                username: {
                    type: 'string',
                    minLength: 3,
                    maxLength: 255,
                    errorMessage: 'Användarnamnet måste vara mellan 3 och 255 tecken långt.',
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
