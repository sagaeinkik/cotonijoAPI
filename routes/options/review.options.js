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
                        userId: { type: 'number' },
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
                    userId: { type: 'number' },
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
                        userId: { type: 'number' },
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
                        userId: { type: 'number' },
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
                    errorMessage: { minLength: 'Textinnehållet måste innehålla minst 3 tecken.' },
                },
                rating: {
                    type: 'number',
                    minimum: 1,
                    maximum: 5,
                    errorMessage: {
                        minimum: 'Betyget kan som lägst vara 1.',
                        maximum: 'Betyget kan som högst vara 5.',
                    },
                },
                ccn3: {
                    type: 'string',
                    pattern: '^[0-9]{3}$',
                    errorMessage: {
                        pattern: 'Landskoden måste vara tresiffrig.',
                    },
                },
                userId: { type: 'number' },
            },
            errorMessage: {
                required: {
                    content: 'Du måste ange textinnehåll för recensionen.',
                    rating: 'Du måste ange ett betyg.',
                    ccn3: 'Du måste ange en landskod (ccn3).',
                    userId: 'Du måste ange ett användarID.',
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
                            userId: { type: 'number' },
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

//Radera
