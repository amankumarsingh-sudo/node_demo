'use strict'

const builder = require('../mongodb')
const ObjectId = require('mongodb').ObjectID
const logger = require('winston');
const tableName = 'users'

/**
 * 
 * @param {*} params 
 * @description - check user is already exist or not.
 */
let checkUsers = async (params) => {
    let query = {
        "email": params.email
    }

    let collection = builder.get().collection(tableName)
    return await collection.find(query).count()

}
/**
 * 
 * @param {*} params 
 * @description {*} signup new user
 */
let signup = async (params) => {
    params['balance'] = parseFloat(4000);
    params['type'] = 1;
    params['typeTxt'] = 'Normal User'

    let collection = builder.get().collection(tableName)
    return await collection.insertOne(params);
}

/**
 * 
 * @param {*} params 
 * @description {*} find user details
 */

let validateUser = async (params) => {
    let query = {
        "$or": [
            {
                "email": params.email
            },
            {
                "phone": params.email
            }
        ]
    }

    let collection = builder.get().collection(tableName)
    return await collection.findOne(query)
}

let fetchUserDetails = async (userId) => {
    let query = {
        "_id": new ObjectId(userId)
    }

    let collection = builder.get().collection(tableName)
    return await collection.findOne(query)
}

let recharge = async (data) => {
    let queryData = {
        $inc: {
            "balance": data.amount,
        }
    }
    if (!data.credit) {
        queryData = {
            $inc: {
                "balance": - data.amount,
            }
        }
    }

    let collection = builder.get().collection(tableName)
    return await collection.updateOne({ "_id": new ObjectId(data.userId) }, queryData)
}

let fetchAccounts = async (params) => {
    let query = {
        "type": 1
    }

    let collection = builder.get().collection(tableName)
    return await collection.find(query).project({ "balance": 1, "username": 1, "_id": 0 }).skip(params.skip * params.limit).limit(params.limit).toArray()
}


module.exports = {
    validateUser,
    signup,
    checkUsers,
    fetchUserDetails,
    recharge,
    fetchAccounts
}