import type { Request, Response } from "express"
import Movie from "../models/Movie"
import { movieSchema } from "../utils/zodSchema";

export const getMovies = async (req: Request, res: Response) => {
    try {
        const movies = await Movie.find().populate({
            path: 'genre',
            select: 'name'
        }).populate({
            path: 'theaters',
            select: 'name'
        });

        return res.json({
            data: movies,
            message: 'Success get data',
            status: 'Success'
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: 'Failed to get data!',
            data: null,
            status: 'Failed'
        });
    }
}

export const createMovie = async (req: Request, res: Response) => {
    try {

        // pengecekan input
        if (!req.file) {
            return res.status(400).json({
                message: 'Thumbnail is required!',
                data: null,
                status: 'Failed'
            });
        }

        const parse = movieSchema.safeParse({
            title: req.body.title,
            genre: req.body.genre,
            theaters: req.body.theaters.split(','),
            available: req.body.available === '1' ? true : false,
            description: req.body.description,
            price: Number.parseInt(req.body.price),
            bonus: req.body?.bonus
        });

        if (!parse.success) {
            const errorMessages = parse.error.issues.map((err) => err.message)

            return res.status(400).json({
                message: 'Invalid request!',
                status: 'Failed'
            });
        }

        //save
        const movie = new Movie({
            title: parse.data.title,
            genre: parse.data.genre,
            available: parse.data.available,
            theaters: parse.data.theaters,
            thumbnail: req.file?.filename,
            description: parse.data.description,
            price: parse.data.price,
            bonus: parse.data.bonus,
        });

        await movie.save();

        return res.json({
            message: 'Success create data',
            data: movie,
            status: 'Success',
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Failed to create data!',
            data: null,
            status: 'Failed'
        });
    }
}