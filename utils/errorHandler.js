'use strict';

/* Återanvänd kod från tidigare projekt */

//Funktion som skapar error-objekt
exports.createError = (httpsmessage = '', code = '', message = '') => ({
    https_response: {
        message: httpsmessage,
        code: code,
    },
    message: message,
});

//Funktion som nollställer error-objektet
exports.resetErrors = () => exports.createError();

//Kontrollerar om något är tomt, null, undefined, på annat sätt ogiltigt
exports.checkEmpty = (val, fieldName) => {
    if (
        val === null ||
        val === undefined ||
        (typeof val === 'string' && val.trim() === '') ||
        val === ''
    ) {
        return {
            valid: false,
            error: exports.createError('Bad request', 400, `${fieldName} får ej lämnas tomt.`),
        };
    } else {
        return { valid: true };
    }
};

//Funktion som tar array av valideringsresultat och kollar igenom efter error
exports.validateFields = (reply, validation) => {
    //Loopa igenom arrayen
    for (const result of validation) {
        //Om det är fel
        if (!result.valid) {
            return reply.code(result.error.https_response.code).send(result.error);
        }
    }
    return null;
};

//Fastify error-hantering
module.exports.errorMapping = (error, request, reply) => {
    if (error.validation) {
        //Map:a felmeddelanden för att ta bort "body" från meddelandet
        const messages = error.validation.map((err) => err.message.replace(/^body\./, ''));
        reply.status(400).send({ statusCode: 400, error: 'Bad Request', messages: messages });
    } else {
        reply.status(error.statusCode || 500).send(error);
    }
};
