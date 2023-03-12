const pg = require('pg');

// DB CONNECTION
const pool = new pg.Pool({
    database: 'SQL_To_do',
    host: 'localhost',
    port: 5432
});

module.exports = pool;