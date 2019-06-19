const Joi = require('joi');
Joi.ObjectId = require('joi-objectid')(Joi);
const users = require('../../../models/user')
const transaction = require('../../../models/transaction')
const authentication = require('../../middleware/authentication')


let payload = {
    mobile: Joi.string().required().description('please enter mobile number').label("mobile is required"),
    amount: Joi.number().required().description('please enter amount').label("amount is not valid")
}
/**
 * @function handlers
 * @param {*} request 
 * @param {*} h 
 */
let handlers = async (request, h) => {

    request.payload.amount = Math.abs(request.payload.amount)

    let validateUser = await users.validateUser({ email: request.payload.mobile })

    if (request.auth.credentials.data._id == validateUser._id.toString())
        return h.response({
            message: "you can't use your number.",
        }).code(406)

    if (!validateUser)
        return h.response({
            message: 'sender mobile number is wrong.',
        }).code(404)

    //check amount
    let userDetails = await users.fetchUserDetails(request.auth.credentials.data._id)
    if (request.payload.amount > userDetails.balance)
        return h.response({
            message: 'you have insufficient balance.',
        }).code(406)



    let collectTransactionData = {
        recieverId: validateUser._id.toString(),
        recieverName: validateUser.username,
        senderId: request.auth.credentials.data._id,
        senderName: request.auth.credentials.data.username,
        amount: parseFloat(request.payload.amount),
    }

    await transaction.transaction(collectTransactionData)


    //update reciever user
    await users.recharge({
        "userId": validateUser._id.toString(),
        "amount": request.payload.amount,
        "credit": true
    })

    //update sender user
    await users.recharge({
        "userId": request.auth.credentials.data._id,
        "amount": request.payload.amount,
        "credit": false
    })

    return h.response({
        message: 'successfully done',
    }).code(200)




}

module.exports = {
    payload,
    handlers
}