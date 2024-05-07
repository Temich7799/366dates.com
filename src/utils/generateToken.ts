import { randomBytes } from 'crypto';

export default function generateToken() {

    const tokenBytes = randomBytes(32);

    const token = tokenBytes.toString('hex');

    return token;
}
