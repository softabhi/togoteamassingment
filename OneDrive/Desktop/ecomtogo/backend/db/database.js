import mysql from 'mysql'

// MySQL connection configuration
export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'togo',
});