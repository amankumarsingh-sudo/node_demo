let sendMoney = require('./post')
let history = require('./get')
let basePath = '/transaction'
let headersValidator = require('../../middleware/validator')

module.exports = [
    /**
     * @author : aman kumar singh
     * @description : This api is used for send money
     * @method :POST
     * @handler :  sendMoney.handlers
     * @validator  : sendMoney.payload
     */
    {
        method: 'POST',
        path: basePath + '/sendMoney',
        options: {
            handler: sendMoney.handlers,
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            description: 'This api is used for send money',
            notes: 'This api is used for send money',
            auth: 'userJWT',
            tags: ['api', 'transaction'], // ADD THIS TAG
            validate: {
                headers: headersValidator.headerAuthValidator,
                payload: sendMoney.payload,
                failAction: (request, h, err) => {
                    return err;
                }
            },

        },
    },
    /**
     * @author : aman kumar singh
     * @description : This api is used for fetch transaction
     * @method :GET
     * @handler :  history.handlers
     * @validator  : history.payload
     */
    {
        method: 'GET',
        path: basePath + '/history/{index}/{limit}',
        options: {
            handler: history.handlers,
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            description: 'This api is used fetch transaction history',
            notes: 'This api is used fetch transaction history',
            auth: 'userJWT',
            tags: ['api', 'transaction'], // ADD THIS TAG
            validate: {
                headers: headersValidator.headerAuthValidator,
                params: history.paramsValidator,
                failAction: (request, h, err) => {
                    return err;
                }
            },

        },
    }]