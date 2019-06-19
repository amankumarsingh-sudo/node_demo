let signin = require('./post')
let basePath = '/signin'

module.exports = [
    /**
     * @author : aman kumar singh
     * @description : This api is used for signin
     * @method :POST
     * @handler :  signin.handlers
     * @validator  : signin.payload
     */
    {
        method: 'POST',
        path: basePath,
        options: {
            handler: signin.handlers,
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            description: 'This api is used for signin',
            notes: 'This api is used for signin',
            tags: ['api', 'user'], // ADD THIS TAG
            validate: {
                payload: signin.payload,
                failAction: (request, h, err) => {
                    return err;
                }
            },

        },
    }]