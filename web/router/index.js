let signup = require('./signup')
let signin = require('./signin')
let recharge = require('./recharge')
let admin = require('./admin')


module.exports = [].concat(
    signup,
    signin,
    recharge,
    admin
)