const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Samolol1950!",
    database: "todoApp_db",
    host: "localhost",
    port: 5432
});

module.exports = pool;