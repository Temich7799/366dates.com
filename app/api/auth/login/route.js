import {
    getConnection
} from '../../../../src/lib/db';
import bcrypt from 'bcrypt';
import {
    serialize
} from 'cookie';
import {
    NextResponse
} from 'next/server';
import encryptObject from '@/utils/encryptObject';

export async function POST(req, res) {

    const data = await req.json();

    const {
        email,
        password
    } = data;

    if (!email || !password) {
        return Response.json('Email and password are required', {
            status: 400
        });
    }

    const connection = await getConnection();

    try {
        const [results] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);

        if (results.length === 0) {
            return Response.json('User not found', {
                status: 400
            });
        }

        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return Response.json('Invalid password', {
                status: 401
            });
        }

        const token = encryptObject({
            email,
            password
        }, process.env.NEXT_SECRET_KEY);

        const cookieOptions = {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        };

        const serializedCookie = serialize('authToken', token, cookieOptions);

        const response = NextResponse.json({
            userId: user.id,
            status: 'Authenticated successfully',
        });

        response.cookies.set('Auth', serializedCookie);

        return response;
    } catch (error) {
        console.error('Error authenticating user: ' + error.stack);
        return Response.json('Error authenticating user', {
            status: 500
        });
    } finally {
        connection.end();
    }
}