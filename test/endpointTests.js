'use strict';

const Lab = require('lab');
const Code = require('code');

const expect = Code.expect;
const lab = exports.lab = Lab.script();

const server = require('./server');


lab.experiment("'success' tests", () => {

    lab.test("string response", async () => {
        let options = {
            method: 'POST',
            url: '/string'
        };
        let response = await server.inject(options);
        expect(response.result).to.only.include({
            data: 'success',
            status: 'success'
        });
    });

    lab.test("JSON object response", async () => {
        let options = {
            method: 'POST',
            url: '/json'
        };
        let response = await server.inject(options);
        expect(response.result).to.only.include({
            data: {
                message: 'success'
            },
            status: 'success'
        });
    });

    lab.test("Array response", async () => {
        let options = {
            method: 'POST',
            url: '/array'
        };
        let response = await server.inject(options);
        expect(response.result).to.only.include({
            data: [
                { message: 'success' }
            ],
            status: 'success'
        });
    });

    lab.test("Buffer response", async () => {
        let options = {
            method: 'POST',
            url: '/buffer'
        };
        let response = await server.inject(options);
        expect(response.result).to.equal('success');
    });

    lab.test('method OPTIONS', async () => {
        let options = {
            method: 'OPTIONS',
            url: '/string'
        };
        let response = await server.inject(options);
        expect(response.result).to.equal('success');
    });

    lab.test('HttpStatusCode: true', async () => {
        let options = {
            method: 'POST',
            url: '/attachHttpStatusCode/success'
        };
        let response = await server.inject(options);
        expect(response.result).to.part.include({
            statusCode: 200
        });
    });

    lab.test('optOut: true', async () => {
        let options = {
            method: 'POST',
            url: '/optOut/success'
        };
        let response = await server.inject(options);
        expect(response.result).to.equal('success');
    });

});

lab.experiment("'fail' 400 tests", () => {

    lab.test('HttpStatusCode: true', async () => {
        let options = {
            method: 'POST',
            url: '/attachHttpStatusCode/fail'
        };
        let response = await server.inject(options);
        expect(response.result).to.only.include({
            status: 'fail',
            data: {
                message: 'fail',
                error: 'Bad Request'
            },
            statusCode: 400
        });
    });

    lab.test('OptOut: true', async () => {
        let options = {
            method: 'POST',
            url: '/optOut/fail'
        };
        let response = await server.inject(options);
        expect(response.result).to.only.include({
            statusCode: 400,
            error: 'Bad Request',
            message: 'fail'
        });
    });

    lab.test('ExtendFailResponse: true', async () => {
        let options = {
            method: 'POST',
            url: '/extendFailResponse/fail'
        };
        let response = await server.inject(options);
        expect(response.result).to.only.include({
            status: 'fail',
            data: {
                error: 'Bad Request',
                message: 'fail'
            },
            message: 'fail',
            code: 1
        });
    });

    lab.test('Boom Error', async () => {
        let options = {
            method: 'POST',
            url: '/attachHttpStatusCode/boom'
        };
        let response = await server.inject(options);
        expect(response.result).to.only.include({
            statusCode: 401,
            data: { error: 'Unauthorized', message: 'Not allowed' },
            status: 'fail'
        });
    });

});

lab.experiment("'error' 500 tests", () => {

    lab.test('HttpStatusCode: true', async () => {
        let options = {
            method: 'POST',
            url: '/attachHttpStatusCode/error'
        };
        let response = await server.inject(options);
        expect(response.result).to.only.include({
            status: 'error',
            message: 'An internal server error occurred',
            statusCode: 500
        });
    });

});
