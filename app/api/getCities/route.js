// pages/api/users/[city].js

import {
    getConnection
} from '@/lib/db';

export async function GET(req, res) {

    const searchParams = req.nextUrl.searchParams;

    const city = searchParams.get('city');

    if (!city) {
        return Response.json({
            error: 'City parameter is required'
        }, {
            status: 400
        });
    }

    const connection = await getConnection();

    try {
        const query = `SELECT DISTINCT city FROM users WHERE city REGEXP ? LIMIT 25`;
        const [results, fields] = await connection.query(query, [city]);

        return Response.json({
            data: results
        });
    } catch (error) {
        return Response.json({
            error: error.message
        }, {
            status: 500
        });
    } finally {
        connection.end();
    }
}