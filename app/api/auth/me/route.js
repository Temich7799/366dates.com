import {
    getConnection
} from '../../../../src/lib/db';
import bcrypt from 'bcrypt';
import {
    cookies
} from 'next/headers'
import {
    parse
} from 'cookie';
import decryptObject from '../../../../src/utils/decryptObject';

export async function GET(req, res) {

    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    const cookie = cookies().get('Auth').value;
    const {
        authToken
    } = parse(cookie);

    if (!authToken) {
        return Response.json('User not authenticated', {
            status: 401
        });
    }

    const {
        email,
        password
    } = decryptObject(authToken, process.env.NEXT_SECRET_KEY);

    const connection = await getConnection();

    try {
        const [results] = await connection.query('SELECT * FROM users WHERE id = ?', [userId]);

        if (results.length === 0) {
            return Response.json('User not found', {
                status: 404
            });
        }

        const user = results[0];

        if (user.email !== email || !bcrypt.compareSync(password, user.password)) {
            return Response.json('Email or password do not match', {
                status: 401
            });
        }

        return Response.json('User authenticated');
    } catch (error) {
        console.error('Error retrieving user data:', error);
        return Response.json('Error retrieving user data', {
            status: 500
        });
    } finally {
        connection.end();
    }
}