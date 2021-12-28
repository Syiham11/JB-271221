const {Pool, Client} = require('pg')

const pool = new Pool({
user: "docker",
host: "localhost",
database: "jubelio",
password: "docker",
port: "5432"
})
module.exports = pool;