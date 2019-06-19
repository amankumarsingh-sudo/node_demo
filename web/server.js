'use strict';

const Hapi = require('hapi');
const logger = require('winston')
const router = require('./router')
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const middleware = require('./middleware')
const mongodb = require('../models/mongodb')
var http = require("https");
const server = new Hapi.Server({
    port: process.env.PORT,
    host: process.env.HOST
});


const init = async () => {

    await server.register([
        middleware.swagger.Inert,
        middleware.swagger.Vision,
        middleware.auth.HAPI_AUTH_JWT,
        {
            plugin: middleware.swagger.HapiSwagger,
            options: middleware.swagger.swaggerOptions
        }
    ]);

    //jwt statergies
    server.auth.strategy('userJWT', 'jwt', middleware.auth.userJwt);
    server.auth.strategy('adminJWT', 'jwt', middleware.auth.adminJwt);
    await server.start();
    await mongodb.connect();
    await server.route(router)

    logger.info(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err)
    process.exit(1);
});

init();

//module.exports = server