
let details = require('./get')
let basePath = '/admin'
let headersValidator = require('../../middleware/validator')

module.exports = [
    /**
     * @author : aman kumar singh
     * @description : This api is used for fetch user account details
     * @method :GET
     * @handler :  details.handlers
     * @validator  : details.payload
     */
    {
        method: 'GET',
        path: basePath + '/userAccounts/{index}/{limit}',
        options: {
            handler: details.handlers,
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            description: 'This api is used for fetch user account details',
            notes: 'This api is used for fetch user account details',
            auth: 'adminJWT',
            tags: ['api', 'admin'], // ADD THIS TAG
            validate: {
                headers: headersValidator.headerAuthValidator,
                params: details.paramsValidator,
                failAction: (request, h, err) => {
                    return err;
                }
            },

        },
    }]