import type { Request, Response } from 'express'
import { authSchema } from '../utils/zodSchema'
import User from '../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const login = async (req: Request, res: Response) => {
    try {
        const parse = authSchema.omit({
            // omit untuk menghilangkan data dibawah ini
            name: true,
        }).parse(req.body)

        const checkUser = await User.findOne({
            email: parse.email,
            role: parse.role,
        })

        if (!checkUser) {
            return res.status(400).json({
                message: 'Email not registered',
                data: null,
                status: 'Failed',
            })
        }

        const comparePassword = bcrypt.compareSync(parse.password, checkUser.password)

        if (!comparePassword) {
            return res.status(400).json({
                message: 'Email or Password inccorect!',
                data: null,
                status: 'Failed',
            })
        }

        const secretKey = process.env.SECRET_KEY ?? ''

        const token = jwt.sign({
            data: {
                id: checkUser.id
            }
        }, secretKey, { expiresIn: '24h' })

        return res.json({
            message: 'Success login',
            data: {
                name: checkUser.name,
                email: checkUser.email,
                role: checkUser.role,
                photoUrl: checkUser.photoUrl,
                token
            },
            status: 'Success'
        })

    } catch (error) {

    }
}