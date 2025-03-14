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
            err = errorHandler.createError('Not Found', 404, 'No users found.');
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
            err = errorHandler.createError('Not Found', 404, 'No user found.');
            return reply.code(err.https_response.code).send(err);
        }

        return reply.send(user);
    } catch (error) {
        return reply.code(500).send(error);
    }
};

//Användare baserat på användarnamn
module.exports.getUserByUsername = async (request, reply) => {
    err = errorHandler.resetErrors();

    //användarnamn att söka på
    const { username } = request.params;

    try {
        const user = await prisma.user.findUnique({ where: { username: username } });

        if (!user) {
            err = errorHandler.createError('Not Found', 404, 'No user found.');
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
    const { fullName, email, username, password } = request.body;

    //Validering av fält sker i Options

    try {
        //Kolla om användare redan finns
        const existingUser = await prisma.user.findUnique({ where: { username: username } });
        if (existingUser) {
            err = errorHandler.createError('Conflict', 409, 'Username already in use.');
            return reply.code(err.https_response.code).send(err);
        }

        //Har vi kommit hit är allt bra, skapa användare med hashat lösenord
        const hashedPassword = await pwHandler.hashPassword(password);

        const newUser = await prisma.user.create({
            data: {
                fullName: fullName,
                email: email,
                username: username,
                password: hashedPassword,
            },
        });

        //Skapa en liten token och lagra i en liten cookie
        pwHandler.createToken(reply, username);

        return reply.code(201).send({
            message: 'User added!',
            newUser: {
                id: newUser.id,
                fullName: newUser.fullName,
                email: newUser.email,
                username: newUser.username,
                registered: newUser.registered,
            },
        });
    } catch (error) {
        return reply.code(500).send(error);
    }
};

//Logga in användare
module.exports.loginUser = async (request, reply) => {
    err = errorHandler.createError();

    const { username, password } = request.body;

    try {
        //Hitta användaren
        const user = await prisma.user.findUnique({ where: { username: username } });

        if (!user) {
            err = errorHandler.createError('Unauthorized', 401, 'Wrong username or password.');
            return reply.code(err.https_response.code).send(err);
        }

        //Jämför lösenordet
        const authorized = await pwHandler.verifyPassword(password, user.password);

        //Fel lösenord
        if (!authorized) {
            err = errorHandler.createError('Unauthorized', 401, 'Wrong username or password.');
            return reply.code(err.https_response.code).send(err);
        }

        //Hamnar vi här stämmer lösenordet. Skapa en token och lagra i cookie
        pwHandler.createToken(reply, username);

        //Returnera användaren
        return reply.send({
            message: 'User logged in!',
            loggedInUser: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                username: user.username,
                registered: user.registered,
            },
        });
    } catch (error) {
        return reply.code(500).send(error);
    }
};

//Logga ut användare
module.exports.logoutUser = async (request, reply) => {
    err = errorHandler.createError();

    try {
        //Radera cookie
        await pwHandler.destroyCookie(reply);

        return reply.send({ message: 'User logged out!' });
    } catch (error) {
        return reply.code(500).send(error);
    }
};

//Uppdatera
module.exports.updateUser = async (request, reply) => {
    err = errorHandler.createError();

    const { id } = request.params;
    const updateData = request.body;

    try {
        //Leta existerande användare
        const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });

        if (!user) {
            err = errorHandler.createError('Not Found', 404, 'User not found.');
            return reply.code(err.https_response.code).send(err);
        }

        //Användare finns. Kolla att det är användaren som äger kontot
        await pwHandler.authenticateToken(request, reply);
        //Användarnamn stämmer inte enligt token:
        if (request.username !== user.username) {
            err = errorHandler.createError(
                'Unauthorized',
                401,
                'You are unauthorized to perform this action.'
            );
            return reply.code(err.https_response.code).send(err);
        }

        //Allt stämmer! Hasha lösenord om det finns
        if (updateData.password) {
            updateData.password = await pwHandler.hashPassword(updateData.password);
        }

        //Uppdatera användare
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: updateData,
        });

        //Om användarnamnet uppdaterades
        if (updateData.username && updateData.username !== user.username) {
            //Uppdatera token i cookie
            pwHandler.createToken(reply, updateData.username);
        }

        //returnera
        return reply.send({
            message: 'User updated!',
            updatedUser: {
                id: updatedUser.id,
                fullName: updatedUser.fullName,
                email: updatedUser.email,
                username: updatedUser.username,
                registered: updatedUser.registered,
            },
        });
    } catch (error) {
        return reply.code(500).send(error);
    }
};

//Radera
module.exports.deleteUser = async (request, reply) => {
    err = errorHandler.createError();

    const { id } = request.params;

    try {
        //Försök hitta användaren
        const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });

        if (!user) {
            err = errorHandler.createError('Not Found', 404, 'User not found.');
            return reply.code(err.https_response.code).send(err);
        }

        //Användare hittades. Kolla att användaren äger kontot
        await pwHandler.authenticateToken(request, reply);
        //Användarnamn stämmer inte enligt token
        if (request.username !== user.username) {
            err = errorHandler.createError(
                'Unauthorized',
                401,
                'You are unauthorized to perform this action.'
            );
            return reply.code(err.https_response.code).send(err);
        }

        //Användarnamn stämmer. Radera användaren
        await prisma.user.delete({ where: { id: parseInt(id) } });

        //Radera cookie
        await pwHandler.destroyCookie(reply);

        return reply.send({
            message: 'User deleted!',
            deletedUser: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                username: user.username,
                registered: user.registered,
            },
        });
    } catch (error) {
        return reply.code(500).send(error);
    }
};
