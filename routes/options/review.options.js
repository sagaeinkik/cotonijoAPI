'use strict';

const reviewController = require('../../controllers/review.controller');
const pwHandler = require('../../utils/passwordHandler');

//Alla recensioner
module.exports.getAllReviewsOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        content: { type: 'string' },
                        rating: { type: 'number' },
                        ccn3: { type: 'string' },
                        posted: { type: 'string', format: 'date-time' },
                        author: {
                            type: 'object',
                            properties: {
                                id: { type: 'number' },
                                fullName: { type: 'string' },
                                username: { type: 'string' },
                            },
                        },
                    },
                },
            },
        },
    },
    handler: reviewController.getAllReviews,
};

//Recension baserat på ID
module.exports.getReviewByIdOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    content: { type: 'string' },
                    rating: { type: 'number' },
                    ccn3: { type: 'string' },
                    posted: { type: 'string', format: 'date-time' },
                    author: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            fullName: { type: 'string' },
                            username: { type: 'string' },
                        },
                    },
                },
            },
        },
    },
    handler: reviewController.getReviewById,
};

//Alla recensioner av användare
module.exports.getReviewsByUserOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        content: { type: 'string' },
                        rating: { type: 'number' },
                        ccn3: { type: 'string' },
                        posted: { type: 'string', format: 'date-time' },
                        author: {
                            type: 'object',
                            properties: {
                                id: { type: 'number' },
                                fullName: { type: 'string' },
                                username: { type: 'string' },
                            },
                        },
                    },
                },
            },
        },
    },
    handler: reviewController.getReviewsByUser,
};

//Alla recensioner av land
module.exports.getReviewsByCountryOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        content: { type: 'string' },
                        rating: { type: 'number' },
                        ccn3: { type: 'string' },
                        posted: { type: 'string', format: 'date-time' },
                        author: {
                            type: 'object',
                            properties: {
                                id: { type: 'number' },
                                fullName: { type: 'string' },
                                username: { type: 'string' },
                            },
                        },
                    },
                },
            },
        },
    },
    handler: reviewController.getReviewsByCountry,
};

//Skapa ny
module.exports.addReviewOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['content', 'rating', 'ccn3', 'userId'],
            properties: {
                content: {
                    type: 'string',
                    minLength: 3,
                    errorMessage: {
                        minLength: 'Review content must contain a minimum of 3 characters.',
                    },
                },
                rating: {
                    type: 'number',
                    minimum: 1,
                    maximum: 5,
                    errorMessage: {
                        minimum: 'Rating cannot be lower than 1.',
                        maximum: 'Rating cannot be higher than 5.',
                    },
                },
                ccn3: {
                    type: 'string',
                    pattern: '^[0-9]{3}$',
                    errorMessage: {
                        pattern: 'Ccn3 must be 3 digits',
                    },
                },
                userId: { type: 'number' },
            },
            errorMessage: {
                required: {
                    content: 'Review content is mandatory.',
                    rating: 'Rating is mandatory.',
                    ccn3: 'Ccn3 is mandatory.',
                    userId: 'UserId is mandatory.',
                },
            },
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    review: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            content: { type: 'string' },
                            rating: { type: 'number' },
                            ccn3: { type: 'string' },
                            posted: { type: 'string', format: 'date-time' },
                            author: {
                                type: 'object',
                                properties: {
                                    id: { type: 'number' },
                                    fullName: { type: 'string' },
                                    username: { type: 'string' },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    preHandler: pwHandler.authenticateToken,
    handler: reviewController.addReview,
};

//Uppdatera
module.exports.updateReviewOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                content: {
                    type: 'string',
                    minLength: 3,
                    errorMessage: {
                        minLength: 'Review content must contain a minimum of 3 characters.',
                    },
                },
                rating: {
                    type: 'number',
                    minimum: 1,
                    maximum: 5,
                    errorMessage: {
                        minimum: 'Rating cannot be lower than 1.',
                        maximum: 'Rating cannot be higher than 5.',
                    },
                },
                ccn3: {
                    type: 'string',
                    pattern: '^[0-9]{3}$',
                    errorMessage: {
                        pattern: 'Ccn3 must be 3 digits.',
                    },
                },
                userId: { type: 'number' },
            },
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    review: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            content: { type: 'string' },
                            rating: { type: 'number' },
                            ccn3: { type: 'string' },
                            posted: { type: 'string', format: 'date-time' },
                            author: {
                                type: 'object',
                                properties: {
                                    id: { type: 'number' },
                                    fullName: { type: 'string' },
                                    username: { type: 'string' },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    preHandler: pwHandler.authenticateToken,
    handler: reviewController.updateReview,
};

//Radera
module.exports.deleteReviewOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    review: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            content: { type: 'string' },
                            rating: { type: 'number' },
                            ccn3: { type: 'string' },
                            posted: { type: 'string', format: 'date-time' },
                            author: {
                                type: 'object',
                                properties: {
                                    id: { type: 'number' },
                                    fullName: { type: 'string' },
                                    username: { type: 'string' },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    preHandler: pwHandler.authenticateToken,
    handler: reviewController.deleteReview,
};
