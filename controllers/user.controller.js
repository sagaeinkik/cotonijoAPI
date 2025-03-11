'use strict';

const prisma = require('../prisma');
const errorHandler = require('../utils/errorHandler');
const pwHandler = require('../utils/passwordHandler');

//Error
let err = errorHandler.createError();

//Hitta alla användare
module.exports.getAllUsers = async (request, reply) => {
    //Nolla fel
    err = errorHandler.resetErrors();

    try {
        //Hitta alla användare
        const users = await prisma.user.findMany();

        //Inga användare hittades
        if (users.length === 0) {
            err = errorHandler.createError('Not Found', 404, 'Inga användare hittades.');
            return reply.code(err.https_response.code).send(err);
        }

        //annars returnera resultatlistan
        return reply.send(users);
    } catch (error) {
        return reply.code(500).send(error);
    }
};

//Användare baserat på ID
module.exports.getUserById = async (request, reply) => {
    err = errorHandler.resetErrors();
    //ID att söka på
    const { id } = request.params;

    try {
        const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });

        if (!user) {
            err = errorHandler.createError('Not Found', 404, 'Användaren hittades inte.');
            return reply.code(err.https_response.code).send(err);
        }

        return reply.send(user);
    } catch (error) {
        return reply.code(500).send(error);
    }
};

//Skapa ny
module.exports.addUser = async (request, reply) => {
    err = errorHandler.resetErrors();
    const { fullName, username, password } = request.body;

    //Validera fält
    const valResults = [
        errorHandler.checkEmpty(fullName, 'Fullständigt namn'),
        errorHandler.checkEmpty(username, 'Användarnamn'),
        errorHandler.checkEmpty(password, 'Lösenord'),
    ];
    const valError = errorHandler.validateFields(reply, valResults);
    if (valError) {
        return valError;
    }

    try {
        //Kolla om användare redan finns (error-meddelandet från Prisma var så fult)
        const existingUser = await prisma.user.findUnique({ where: { username: username } });
        if (existingUser) {
            err = errorHandler.createError('Conflict', 409, 'Användarnamnet är upptaget.');
            return reply.code(err.https_response.code).send(err);
        }

        //Har vi kommit hit är allt bra, skapa användare med hashat lösenord
        const hashedPassword = await pwHandler.hashPassword(password);

        const newUser = await prisma.user.create({
            data: {
                fullName: fullName,
                username: username,
                password: hashedPassword,
            },
        });

        //Skapa en liten token
        const token = pwHandler.createToken(reply, username);

        return reply.code(201).send({
            message: 'Användare tillagd!',
            newUser: {
                id: newUser.id,
                fullName: newUser.fullName,
                username: newUser.username,
                registered: newUser.registered,
            },
        });
    } catch (error) {
        return reply.code(500).send(error);
    }
};

//Uppdatera

//Radera
