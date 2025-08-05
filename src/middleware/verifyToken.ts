import type { Response, Request, NextFunction } from "express"
import jwt from 'jsonwebtoken'
import User from "../models/User";
import type { CustomerRequest } from "../type/Request";


type JWTPayload = {
    data: { id: string };
}

export const verifyToken = async (
    req: CustomerRequest,
    res: Response,
    next: NextFunction
) => {
    const secretKey = process.env.SECRET_KEY ?? '';

    if (req.headers?.authorization?.split(' ')[0] === 'JWT') {
        const token = req.headers?.authorization?.split(' ')[1];
        const decode = (await jwt.verify(token, secretKey)) as JWTPayload;

        const user = await User.findById(decode.data.id);

        if (!user) {
            return res.status(401).json({
                message: 'Token invalid',
            });
        }

        req.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        }

        next();
    } else {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }
}

export const verifyRole =
    (type: 'admin' | 'customer') =>
        async (req: CustomerRequest, res: Response, next: NextFunction) => {
            if (req?.user?.role === type) {
                next();

                return;
            }

            return res.status(401).json({
                message: 'Unauthorized!',
            });
        }