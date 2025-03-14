'use strict';

/* Återanvänd kod från tidigare projekt */

require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtKey = process.env.JWT_SECRET_KEY;
const bcrypt = require('bcrypt');
const errHandler = require('./errorHandler');

//Skapa web token
const expirationDate = 60 * 60 * 3; //Tre timmar

module.exports.createToken = (reply, username) => {
    const token = jwt.sign({ username }, jwtKey, { expiresIn: expirationDate });

    //Sätt cookie
    reply.setCookie('jwt', token, {
        httpOnly: true,
        secure: true,
        path: '/',
        sameSite: 'lax',
        maxAge: expirationDate,
    });

    return token;
};

//Validera token
module.exports.authenticateToken = async (request, reply) => {
    let err = errHandler.createError();

    //Hämta token från cookie
    const token = request.cookies.jwt;

    //Token saknas
    if (!token) {
        err = errHandler.createError('Unauthorized', 401, 'Missing Token');
        return reply.code(err.https_response.code).send(err);
    }

    try {
        //Verifiera mha jwt-secret-key
        const user = jwt.verify(token, jwtKey);

        //Sätt användarnamn
        request.username = user.username;
    } catch (error) {
        const authError = errHandler.createError('Unauthorized', 401, 'Invalid Token');
        return reply.code(authError.https_response.code).send(authError);
    }
};

//Radera cookie
module.exports.destroyCookie = async (reply) => {
    reply.clearCookie('jwt', { path: '/', httpOnly: true, sameSite: 'lax' });
};

//Hasha lösenord
module.exports.hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Fel vid kryptering av lösenord:', error);
        throw new Error('Kunde inte kryptera lösenord');
    }
};

//Jämför lösenord
module.exports.verifyPassword = async (password, hashedPassword) => {
    try {
        const authorized = await bcrypt.compare(password, hashedPassword);
        return authorized;
    } catch (error) {
        console.error('Fel vid jämförelse av lösenord:', error);
        throw new Error('Kunde inte jämföra lösenord');
    }
};
