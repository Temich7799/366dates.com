import getMonthName from '@/utils/getMonthName';
import { getConnection } from '../../../../src/lib/db';
import bcrypt from 'bcrypt';

export async function POST(req, res) {
    const data = await req.json();

    const {
        name,
        day,
        month,
        city,
        language,
        foreign,
        another_foreign,
        email,
        note,
        password
    } = data;

    if (!email || !password) {
        return Response.json('Required fields are missed', {
            status: 400
        });
    }

    if (!name && !day && !month && !city && !language && !foreign && !another_foreign && !email && !note && !password) {
        return Response.json('All fields are empty', {
            status: 400
        });
    }

    const connection = await getConnection();

    try {
        const [existingUser] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);

        if (existingUser.length > 0) {
            return Response.json('User already exists', {
                status: 400
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const monthName = getMonthName(month);

        const query = 'INSERT INTO users (name, day, month, month_name, city, `language`, `foreign`, another_foreign, email, note, `password`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const [result] = await connection.query(query, [name, day, month, monthName, city, language, foreign, another_foreign, email, note, hashedPassword]);

        return Response.json({
            data: {
                userId: result.insertId,
            },
            status: 'User added successfully'
        });
    } catch (error) {
        console.error('Error adding user: ' + error.stack);
        return Response.json('Error adding user', {
            status: 500
        });
    } finally {
        connection.end();
    }
}
