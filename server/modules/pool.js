const pg = require('pg');
let pool;

if (process.env.DATABASE_URL) {
    pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
}
else { 
    pool = new pg.Pool({
        database: 'SQL_To_do',
        host: 'localhost',
        port: 5432
    });
}
        
  


module.exports = pool;