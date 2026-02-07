import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'fallback_secret';

export function signToken(payload: { userId: string; email: string }) {
    return jwt.sign(payload, SECRET, {
        expiresIn: '20d',
    });
}

export function verifyToken(token: string) {
    try {
        return jwt.verify(token, SECRET);
    } catch (error) {
        return null;
    }
}