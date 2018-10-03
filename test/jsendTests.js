'use strict';

// npm modules
const Lab = require('lab');
const Code = require('code');

const expect = Code.expect;
const lab = exports.lab = Lab.script();

// application modules
const JSendError = require('../index').JSendError;

lab.experiment('JSendError Class -->', () => {

    lab.test('JSendError instance name is JSendError', () => {

        let error = new JSendError('hi');
        expect(error.name).to.equal('JSendError');
    });

    lab.test('JSendError instance isBoom === true', () => {

        let error = new JSendError('hi');
        expect(error.isBoom).to.be.true();
    });

    lab.test('JSendError instance isJSend === true', () => {

        let error = new JSendError('hi');
        expect(error.isJSend).to.be.true();
    });

    lab.test("JSendError ctor with only message is 500 and error", () => {

        let error = new JSendError('hi');
        expect(error.statusCode).to.equal(500);
        expect(error.status).to.equal('error');
        expect(error.message).to.equal('hi');
    });

    lab.test("JSendError ctor with === 500 statusCode is error", () => {

        let error = new JSendError('hi', 500);
        expect(error.statusCode).to.equal(500);
        expect(error.status).to.equal('error');
    });

    lab.test("JSendError ctor with > 500 statusCode is error", () => {

        let error = new JSendError('hi', 501);
        expect(error.statusCode).to.equal(501);
        expect(error.status).to.equal('error');
    });

    lab.test("JSendError ctor with < 500 statusCode is fail", () => {

        let error = new JSendError('hi', 499);
        expect(error.statusCode).to.equal(499);
        expect(error.status).to.equal('fail');
    });

    lab.test("JSendError ctor with code attaches code", () => {

        let error = new JSendError('hi', 400, 1);
        expect(error.statusCode).to.equal(400);
        expect(error.status).to.equal('fail');
        expect(error.code).to.equal(1);
    });

    lab.test("JSendError.toAutoDocNote when ctor('message') produces message.", () => {

        let error = new JSendError('hi');
        let message = error.toAutoDocNote();
        expect(message).to.equal('HttpStatusCode - 500, Code - undefined : hi');
    });

    lab.test("JSendError.toAutoDocNote when ctor('message', 400) produces message.", () => {

        let error = new JSendError('hi', 400);
        let message = error.toAutoDocNote();
        expect(message).to.equal('HttpStatusCode - 400, Code - undefined : hi');
    });

    lab.test("JSendError.toAutoDocNote when ctor('message', 400, 1) produces message.", () => {

        let error = new JSendError('hi', 400, 1);
        let message = error.toAutoDocNote();
        expect(message).to.equal('HttpStatusCode - 400, Code - 1 : hi');
    });

    lab.test("JSendError.clone when ctor('message') produces JSendError.", () => {

        let error = new JSendError('hi');
        error.isBoom = false;
        let uut = error.clone();
        expect(uut.isBoom).to.be.true();
    });

    lab.test("JSendError.clone when ctor('message', 400) produces JSendError.", () => {

        let error = new JSendError('hi', 400);
        error.isBoom = false;
        let uut = error.clone();
        expect(uut.isBoom).to.be.true();
    });

    lab.test("JSendError.clone when ctor('message', 400, 1) produces JSendError.", () => {

        let error = new JSendError('hi', 400, 1);
        error.isBoom = false;
        let uut = error.clone();
        expect(uut.isBoom).to.be.true();
    });
});