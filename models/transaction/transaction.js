'use strict'

const builder = require('../mongodb')
const ObjectId = require('mongodb').ObjectID
const logger = require('winston');
const tableName = 'transaction'
const moment = require('moment')


let transaction = async (params) => {
    let data = {
        recieverId: new ObjectId(params.recieverId),
        recieverName: params.recieverName,
        senderId: new ObjectId(params.senderId),
        senderName: params.senderName,
        amount: parseFloat(params.amount),
        status: 1,
        statusText: 'Success',
        transactionOn: new Date(moment().toISOString())
    }
    let collection = builder.get().collection(tableName)
    return await collection.insertOne(data)
}

let fetchTransaction = async (data) => {
    let aggregateQuery = [
        {
            $match: {
                $or: [
                    { "recieverId": new ObjectId(data.userId) },
                    { "senderId": new ObjectId(data.userId) }
                ]
            }
        },
        {
            "$project": {
                "_id" : 1,
                "txnType": {
                    $cond: {
                        if: { $eq: ["$recieverId", new ObjectId(data.userId)] },
                        then: "Transfer",
                        else: "Credit"
                    }
                },
                "amount": 1,
                "transactionOn": 1,
                "status": "$statusText",
                "senderName" : "$senderName",
                "recieverName" : "$recieverName"
            }
        },
        { $skip: data.index * data.limit },
        { $limit: data.limit }
    ]

    let collection = builder.get().collection(tableName)
    return await collection.aggregate(aggregateQuery).toArray()
}


module.exports = {
    fetchTransaction,
    transaction,

}