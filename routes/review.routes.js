'use strict';

const {
    getAllReviewsOpts,
    getReviewByIdOpts,
    getReviewsByUserOpts,
    getReviewsByCountryOpts,
} = require('./options/review.options');

async function reviewRoutes(fastify) {
    fastify.get('/reviews', getAllReviewsOpts); // Alla recensioner
    fastify.get('/reviews/:id', getReviewByIdOpts); // Enskild recension på ID
    fastify.get('/reviews/country/:ccn3', getReviewsByCountryOpts); // Alla recensioner av land
    fastify.get('/users/:id/reviews', getReviewsByUserOpts); // Alla recensioner av användare
}

module.exports = reviewRoutes;
