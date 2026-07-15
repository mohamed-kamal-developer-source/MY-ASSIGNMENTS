const {Client} = require('pg');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});

const client = new Client ({
    user:process.env.USER_DB,
    host:process.env.HOST,
    database:process.env.DATABASE,
    password:process.env.PASSWORD,
    port:process.env.PORT
})
//
module.exports = client

