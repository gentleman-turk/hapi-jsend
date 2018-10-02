# hapi-jsend

Format responses from hapi into JSend format.

![npm version] ![Known Vulnerabilities] ![GitHub license] ![Build Status] ![Coverage Status]

Lead Maintainer: [Robert Hernandez]

## Introduction

[JSend] "lays down some rules for how JSON responses from web servers should be formatted." The intent of this [hapi] plugin is to format all messages from a hapi server into this format.

### JSend standard TL;DR

The following are quick examples of the JSend standard. Please visit their [website](https://labs.omniti.com/labs/jsend) for more information.

### Success

```json
{
    "status": "success",
    "data": {
        "post": { "id": 1, "title": "A blog post", "body": "Some useful content" }
     }
}
```

### Fail

```json
{
    "status": "fail",
    "data": { "title": "A title is required" }
}
```

### Error Basic

```json
{
    "status": "error",
    "message": "Unable to communicate with database"
}
```

### Error with Optionals

```json
{
    "status": "error",
    "message": "Unable to communicate with database",
    "code": 1,
    "data": "Unable to communicate with database"
}
```

## Getting Started

### Installation

    npm install hapi-jsend

### Bootsrapping in hapi server

```js
const server = new Hapi.Server({
    port: 3000,
    host: 'localhost'
});


const init = async () => {

    await server.register(require('hapi-jsend'));

    await server.start();
    console.info(`Server running at: ${server.info.uri}`);
};

init();
```

## Extensions

### Add HTTP StatusCode

I decided to add a statusCode property to the payload as well. I personally always having to check to objects: the httpResponse and the payload to determine why a response is the way it is.

 #### JSend standard message 

 ```json
{
    "status": "fail",
    "data": { 
        "title": "A title is required" 
    }
}
 ```

 #### JSend extended message 

 ```json
{
    "status": "fail",
    "data": { 
        "title": "A title is required" 
    },
    "statusCode": 400
}
 ```
### Extend __fail__ response

 I have taken the liberty to extend JSend a bit when it comes to the _fail_ status. I believe that it should be more like  _error_ and allow for sub codes and messages. Think of a response like 404 in which content is really NOT_FOUND or content is known to be deleted. If we make _fail_ more like _error_ we can indicate this distinction while providing a useful message to the user.

 #### JSend standard fail 

 ```json
{
    "status": "fail",
    "data": { 
        "title": "A title is required" 
    }
}
 ```

 #### JSend extended fail 

 ```json
{
    "status": "fail",
    "message": "Bad Request",
    "code": 1,
    "data": { 
        "title": "A title is required" 
    },
    "statusCode": 400
}
```

### Plugin Configuration

Both of the extensions described above are "opt-in" since they are non-standard. 

```json
{
    "attachHttpStatusCode": true,
    "extendFailResponse": true
}
```

#### Configuration example

```js
    await server.register({
        plugin: require('hapi-jsend'),
        options: {
            attachHttpStatusCode: true,
            extendFailResponse: true
        }
    });
```

## Route Plugin Configuration

An individual route can opt-out from JSend formatting.

### Opt-Out

```js
server.route({
    method: 'GET',
    path: '/',
    options: {
        plugins: {
            hapiJSend: {
                optOut: true
            }
        },
        handler: function(request, h) {
            return "OK";
        }
    }
});

```




[hapi]: https://hapijs.com/
[JSend]: https://labs.omniti.com/labs/jsend

[Robert Hernandez]: https://github.com/gentleman-turk
[npm version]: https://badge.fury.io/js/hapi-jsend.svg "https://badge.fury.io/js/hapi-jsend"
[Known Vulnerabilities]: https://snyk.io/test/github/gentleman-turk/hapi-jsend/badge.svg "https://snyk.io/test/github/gentleman-turk/hapi-jsend"
[GitHub license]: https://img.shields.io/badge/license-ISC-blue.svg "https://github.com/gentleman-turk/hapi-jsend/blob/master/LICENSE"
[Build Status]: https://travis-ci.org/gentleman-turk/hapi-jsend.svg?branch=master "https://travis-ci.org/gentleman-turk/hapi-jsend"
[Coverage Status]: https://coveralls.io/repos/github/gentleman-turk/hapi-jsend/badge.svg?branch=master "https://coveralls.io/github/gentleman-turk/hapi-jsend?branch=master"