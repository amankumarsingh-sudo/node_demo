const Pack = require('../../package')
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');

const swaggerOptions = {
    info: {
        title: process.env.TITLE,
        version: Pack.version,
    },
};


module.exports = {
    swaggerOptions,
    HapiSwagger,
    Vision,
    Inert
}