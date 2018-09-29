# hapi-jsend

Format responses from hapi into JSend format.

![npm version] ![Known Vulnerabilities] ![GitHub license] ![Build Status] ![Coverage Status]

Lead Maintainer: [Robert Hernandez]

## Introduction




## Getting Started

### Installation

    npm install hapi-jsend

### Bootsrapping in hapi server

```Javascript
const server = new Hapi.Server({
    port: 3000,
    host: 'localhost'
});


const init = async () => {

    await server.register(require('hapi-jsend'));
};

init();
```


[hapi]: https://hapijs.com/
[Robert Hernandez]: https://github.com/gentleman-turk
[npm version]: https://badge.fury.io/js/hapi-jsend.svg "https://badge.fury.io/js/hapi-jsend"
[Known Vulnerabilities]: https://snyk.io/test/github/gentleman-turk/hapi-jsend/badge.svg "https://snyk.io/test/github/gentleman-turk/hapi-jsend"
[GitHub license]: https://img.shields.io/badge/license-ISC-blue.svg "https://github.com/gentleman-turk/hapi-jsend/blob/master/LICENSE"
[Build Status]: https://travis-ci.org/gentleman-turk/hapi-jsend.svg?branch=master "https://travis-ci.org/gentleman-turk/hapi-jsend"
[Coverage Status]: https://coveralls.io/repos/github/gentleman-turk/hapi-jsend/badge.svg?branch=master "https://coveralls.io/github/gentleman-turk/hapi-jsend?branch=master"