import mysql from 'mysql2/promise';

export function getConnection() {
    return mysql.createConnection({
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
    });
}