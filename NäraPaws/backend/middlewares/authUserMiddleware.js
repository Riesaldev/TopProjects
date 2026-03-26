import jwt from 'jsonwebtoken';
import generateErrorUtil from '../utils/generateErrorUtil.js';

const authUserMiddleware = (req, res, next) => {
    try {
        const { authorization }= req.headers;
        if (!authorization) {
            return next(
                generateErrorUtil(401, 'Unauthorized: No token provided')
            );
        }
        try {
            const token = jwt.verify(authorization, process.env.JWT_SECRET);
            req.user = {
                userId: token.userId,
                rol: token.rol
            };
            next();
        } catch (error) {
            console.error('Token verification failed:', error);
            next(
                generateErrorUtil(401, 'Unauthorized: Invalid token')
            );
            }
        } catch (error) {
            console.error('Authentication error:', error);
            next(
                generateErrorUtil(500, 'Internal Server Error')
            );
        }
    };

export default authUserMiddleware;