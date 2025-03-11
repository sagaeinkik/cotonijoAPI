'use strict';

const prisma = require('../prisma');
const errorHandler = require('../utils/errorHandler');

//Error
let err = errorHandler.createError();

//Hitta alla recensioner
module.exports.getAllReviews = async (request, reply) => {
    //Nollställ error
    err = errorHandler.resetErrors();
    try {
        const reviews = await prisma.review.findMany();

        //Inga recensioner
        if (reviews.length === 0) {
            err = errorHandler.createError('Not Found', 404, 'Inga recensioner hittades.');
            return reply.code(err.https_response.code).send(err);
        }

        //Annars returnera resultaten
        return reply.send(reviews);
    } catch (error) {
        return reply.code(500).send(error);
    }
};

//Enskild recension baserat på ID
module.exports.getReviewById = async (request, reply) => {
    err = errorHandler.resetErrors();

    const { id } = request.params;

    try {
        const review = await prisma.review.findUnique({ where: { id: parseInt(id) } });

        //Ingen recension
        if (!review) {
            err = errorHandler.createError('Not found', 404, 'Ingen recension hittades.');
            return reply.code(err.https_response.code).send(err);
        }

        return reply.send(review);
    } catch (error) {
        return reply.code(500).send(error);
    }
};

//Alla recensioner av en användare
module.exports.getReviewsByUser = async (request, reply) => {
    err = errorHandler.resetErrors();

    const { id } = request.params;

    try {
        //Hämta reviews med användarID
        const reviews = await prisma.review.findMany({ where: { userId: parseInt(id) } });

        if (reviews.length === 0) {
            err = errorHandler.createError('Not Found', 404, 'Inga recensioner hittades.');
            return reply.code(err.https_response.code).send(err);
        }

        return reply.send(reviews);
    } catch (error) {
        return reply.code(500).send(error);
    }
};

//Alla recensioner för ett land (ccn3-kod)
module.exports.getReviewsByCountry = async (request, reply) => {
    err = errorHandler.resetErrors();

    //Landskoden
    const { ccn3 } = request.params;

    try {
        //Hämta med hjälp av landskod
        const reviews = await prisma.review.findMany({ where: { ccn3: ccn3 } });

        if (reviews.length === 0) {
            err = errorHandler.createError('Not found', 404, 'Inga recensioner hittades.');
            return reply.code(err.https_response.code).send(err);
        }

        return reply.send(reviews);
    } catch (error) {
        return reply.code(500).send(error);
    }
};

//Skapa ny
module.exports.addReview = async (request, reply) => {
    err = errorHandler.resetErrors();

    //Hämta data från body
    const { content, rating, ccn3, userId } = request.body;

    //Validering sker i options

    try {
        //Skapa recension
        const review = await prisma.review.create({
            data: {
                content,
                rating,
                ccn3,
                userId: parseInt(userId),
            },
        });

        return reply.send({ message: 'Recension tillagd!', review });
    } catch (error) {
        return reply.code(500).send(error);
    }
};

//Uppdatera

//Radera
