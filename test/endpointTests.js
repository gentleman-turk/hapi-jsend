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
        console.dir(response.result);
    });

    lab.test("JSON object response", async () => {
        let options = {
            method: 'POST',
            url: '/json'
        };
        let response = await server.inject(options);
        console.dir(response.result);
    });

});

lab.experiment("'fail' 400 tests", () => {

});

lab.experiment("'fail' 400 tests", () => {

});
