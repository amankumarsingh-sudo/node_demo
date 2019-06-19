###################
hapi 18.1.0
###################

###################
start api
###################

nodemon index.js

## see documentation
localhost:3000/documentation


##create .env file in root directory add following details

MG_URI=mongodb://username:password@ip-address:27017/
MG_DB=dbname
PORT=3000
NODE_ENV="developement"
HOST=localhost
TITLE="Payment API Documentation"

ROUNDS=10
JWT_KEY="$2y$10$6xm9RdsCbevgJUmUT9TDbeK34bqnhQOjpNhn/KTZg2A9TSb1/YGJi"
JWT_EXPIRES="1h"




