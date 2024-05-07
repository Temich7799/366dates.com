import {
    getConnection
} from '../../../src/lib/db';

export async function POST(req, res) {

    const data = await req.json();

    const {
        userId,
        friendId
    } = data;

    if (userId === friendId) {
        return Response.json('User and friend cannot be the same', {
            status: 400
        });
    }

    const connection = await getConnection();

    try {

        const userExists = await connection.query('SELECT * FROM users WHERE id = ?', [userId]);
        const friendExists = await connection.query('SELECT * FROM users WHERE id = ?', [friendId]);

        if (userExists.length === 0 || friendExists.length === 0) {
            return Response.json('One or both users do not exist', {
                status: 400
            });
        }

        await connection.query('INSERT INTO friendships (user_id, friend_id) VALUES (?, ?)', [userId, friendId]);

        return Response.json('Friend added successfully');
    } catch (error) {
        console.error('Error adding friend: ' + error.stack);
        return Response.json('Error adding friend', {
            status: 500
        });
    } finally {
        connection.end();
    }
}