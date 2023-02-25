const {createPool} = require('mysql');
const config = require('../constants/configConstants')

const pool = createPool({
    port: config.DB_PORT,
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    connectionLimit: config.DB_CONNECTION_LIMIT,
});

module.exports = pool;