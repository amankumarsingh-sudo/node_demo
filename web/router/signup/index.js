let signup = require('./post')
let basePath = '/registration'

module.exports = [
    /**
     * @author : aman kumar singh
     * @description : This api is used for registration new user 
     * @method :POST
     * @handler :  signup.handlers
     * @validator  : signup.payload
     */
    {
        method: 'POST',
        path: basePath,
        options: {
            handler: signup.handlers,
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            description: 'This api is used for registration new user  ',
            notes: 'This api is used for registration new user ',
            tags: ['api', 'user'], // ADD THIS TAG
            validate: {
                payload: signup.payload,
                failAction: (request, h, err) => {
                    return err;
                }
            },

        },
    }]