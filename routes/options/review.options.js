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

//Uppdatera

//Radera
