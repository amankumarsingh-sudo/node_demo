
const joi = require('joi');

const headerAuthValidator = joi.object({
    'authorization': joi.string().required().description("authorization code,Eg. Key").error(new Error('authorization is missing'))
}).options({ allowUnknown: true })


module.exports = { headerAuthValidator };