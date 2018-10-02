'use strict';
/* $lab:coverage:off$ */
const Hapi = require('hapi');


// initialize the Hapi Server instance
const server = new Hapi.Server({
    port: 3000,
    host: 'localhost'
});

const init = async () => {
    await server.register(require('../index'));

    await server.start();
    console.info(`Server running at: ${server.info.uri}`);
};

init();

// used for testing
module.exports = server;

/* $lab:coverage:on$ */
