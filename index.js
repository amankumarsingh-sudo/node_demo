'use strict'
require('dotenv').config({
    path: './.env'
});

/** load .env in local development **/
if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({
        silent: true
    })
}

require('./web/server')