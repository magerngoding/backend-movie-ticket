import type { Response, Request } from "express"
import Movie from "../models/Movie";
import Genre from "../models/Genre";
import Transaction from "../models/Transaction";

export const getMovies = async (req: Request, res: Response) => {
    try {
        const data = await Movie.find()
            .select('title thumbnail')
            .populate({
                path: 'genre',
                select: 'name -_id'
            })
            .limit(3)

        return res.json({
            message: 'Success get data',
            data: data,
            status: 'Success',
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: 'Failed to get data!',
            data: null,
            status: 'Failed'
        })
    }
}

export const getGenre = async (req: Request, res: Response) => {
    try {
        const genres = await Genre.find()
            .select('name')
            .limit(3)

        return res.json({
            message: 'Success get data',
            data: genres,
            status: 'Success',
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: 'Failed to get data!',
            data: null,
            status: 'Failed'
        })
    }
}

export const getMovieDetail = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const seats = []

        for (let i = 0; i < 5; i++) {
            seats.push({
                seat: `A${i + 1}`,
                isBooked: false
            })
        }

        for (let i = 0; i < 5; i++) {
            seats.push({
                seat: `B${i + 1}`,
                isBooked: false
            })
        }

        for (let i = 0; i < 5; i++) {
            seats.push({
                seat: `C${i + 1}`,
                isBooked: false
            })
        }

        const movie = await Movie.findById(id)
            .populate({
                path: 'theaters',
                select: 'name city'
            })
            .populate({
                path: 'genre',
                select: 'name -_id'
            })

        return res.json({
            data: {
                movie: {
                    ...movie?.toJSON(),
                    seats,
                    times: ['12.30', '14.50', '18.30', '21.00', '23.45']
                }
            },
            message: 'Success get data',
            status: 'Success',
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: 'Failed to get data!',
            data: null,
            status: 'Failed'
        })
    }
}

export const getAvailableSeats = async (req: Request, res: Response) => {
    try {
        const { movieId } = req.params
        const { date } = req.params

        const transactions = await Transaction.find({
            date: date?.toString().replace('+', ' '),
            movie: movieId,
        })
            .select('seats').populate({
                path: 'seats',
                select: 'seat'
            })

        const seats = []

        for (const seat of transactions) {
            seats.push(...seat.seats)
        }

        return res.json({
            message: 'Success get data',
            data: seats,
            status: 'Success',
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: 'Failed to get data!',
            data: null,
            status: 'Failed'
        })
    }

}