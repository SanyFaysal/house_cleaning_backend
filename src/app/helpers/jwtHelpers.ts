
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';


const createToken = (
    payload: Record<string, unknown>,
    secret: Secret,
    expireTime: string
): string => {
    return jwt.sign(payload, secret, {
        expiresIn: expireTime,
    });
};


const verifyToken = (token: string, secret: Secret): JwtPayload => {
    const user = jwt.verify(token, secret) as JwtPayload;
    return user;
};


export const jwtHelpers = {
    createToken,
    verifyToken
}