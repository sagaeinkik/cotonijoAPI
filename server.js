'use strict';

const fastify = require('fastify')({ logger: false });
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();
const cors = require('@fastify/cors');
const prisma = new PrismaClient();

//Middleware
fastify.register(cors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
});

//Routes

//Välkomstroute
fastify.get('/', async (request, reply) => {
    return {
        message:
            'Välkommen till mitt API för projektet i Fördjupad Frontend-utveckling på Mittuniversitetet.',
    };
});

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
