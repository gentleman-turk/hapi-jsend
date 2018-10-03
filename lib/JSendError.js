'use strict';

const Boom = require('boom');

class JSendError extends Error {
    constructor(message, statusCode, code) {

        super(message);
        this.isJSend = true;
        this.statusCode = statusCode === undefined ? 500 : statusCode;
        this.status = this.statusCode >= 500 ? 'error' : 'fail';
        this.code = code;
        this.name = 'JSendError';
        Boom.boomify(this, { statusCode: this.statusCode });
    }

    clone() {

        return new JSendError(this.message, this.statusCode, this.code);
    }

    toAutoDocNote() {

        return `HttpStatusCode - ${this.statusCode}, Code - ${this.code} : ${this.message}`;
    }
}

module.exports = JSendError;
