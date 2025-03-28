'use strict';

const fastify = require('fastify')({
    //Errorhantering
    ajv: {
        plugins: [require('ajv-errors')],
        customOptions: { allErrors: true },
    },
    //Loggning: false för det blir så väldigt mycket
    logger: false,
});
const { errorMapping } = require('./utils/errorHandler');
require('dotenv').config();

//ORM
const { PrismaClient } = require('@prisma/client');
const prisma = require('./prisma');

//Middleware
const cors = require('@fastify/cors');
fastify.register(cors, {
    origin: (origin, cb) => {
        if (!origin) {
            return cb(null, true); // Tillåt t.ex. thunderclient
        }
        return cb(null, origin); // Tillåt bara exakt den origin som skickar requesten
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
});
fastify.setErrorHandler(errorMapping);

//Cookie-hantering
const cookie = require('@fastify/cookie');
fastify.register(cookie, {
    secret: process.env.JWT_SECRET_KEY,
});

//Routes

//Välkomstroute
fastify.get('/', async (request, reply) => {
    return {
        message:
            'Välkommen till mitt API för projektet i Fördjupad Frontend-utveckling på Mittuniversitetet. Det är framtaget för en klientapplikation på engelska, därav är även API:et och felmeddelanden på engelska.',
    };
});

fastify.register(require('./routes/user.routes'));
fastify.register(require('./routes/review.routes'));
fastify.register(require('./routes/auth.routes'));

// Hook man kan använda vid testning för att se om cookies fungerar
/* fastify.addHook('onRequest', async (request, reply) => {
    console.log('Cookies:', request.cookies);
}); */

//App
let port = process.env.PORT || 3000;

//Funktion för anslutning
async function dbConnect() {
    try {
        await prisma.$connect(); //Ansluter automatiskt till databasen via .env
        console.log('Ansluten till databasen!');
    } catch (error) {
        console.error('Något gick fel vid anslutning till databasen: ', error);
        process.exit(1);
    }
}

//Funktion för att starta app
async function start() {
    try {
        await dbConnect();
        await fastify.listen({ port, host: '0.0.0.0' });
        console.log(`Applikationen är igång på port ${port}`);
    } catch (error) {
        console.error('Något gick fel vid start av applikationen: ', error);
        process.exit(1);
    }
}
start();
