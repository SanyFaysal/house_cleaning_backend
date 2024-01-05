import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';


import config from '../../config';
import { jwtHelpers } from '../helpers/jwtHelpers';



const auth =
    (...requiredRoles: string[]) =>
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                //get authorization token
                const token = req.headers.authorization?.split(' ')[1] as string;
                if (!token) {
                    return res.status(httpStatus.NOT_FOUND).json({
                        status: false,
                        message: 'Token not found'
                    })
                }
                // verify token
                let verifiedUser = null;

                verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

                req.user = verifiedUser; // role  , userid

                // role diye guard korar jnno
                if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
                    return res.status(httpStatus.FORBIDDEN).json({
                        status: false,
                        message: 'You are not authorized'
                    })
                }
                next();
            } catch (error) {
                next(error);
            }
        };

export default auth;
