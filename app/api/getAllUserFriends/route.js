import {
    UserModel
} from '@/lib/Models/UserModel';
import {
    getConnection
} from '../../../src/lib/db';

export async function POST(req, res) {

    const data = await req.json();

    const {
        userId
    } = data;

    if (!userId) {
        return Response.json('userId is required', {
            status: 400
        });
    }

    const connection = await getConnection();

    try {

        // const fieldsToExclude = ['email', 'password', 'language', 'foreign', 'another_foreign'];

        // const fieldsToSelect = UserModel.fields
        //     .filter(field => !fieldsToExclude.includes(field))
        //     .join(', '); TODO

        const fieldsToSelect = '*';

        const query = `
            SELECT DISTINCT ${fieldsToSelect}
            FROM friendships f
            INNER JOIN users u ON u.id = f.friend_id
            WHERE f.user_id = ?
            ORDER BY u.city
        `;

        const [results, fields] = await connection.query(query, [userId]);

        return Response.json(results);
    } catch (error) {
        console.error('Error fetching friends: ' + error.stack);
        return Response.json('Error fetching friends', {
            status: 500
        });
    } finally {
        connection.end();
    }
}