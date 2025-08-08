import express from 'express'
import { getAvailableSeats, getGenre, getMovieDetail, getMovies, } from '../../controller/globalController'

const globalRoutes = express.Router()

globalRoutes.get('/movies', getMovies);
globalRoutes.get('/movies/:id', getMovieDetail);
globalRoutes.get('/check-seats/:movieId', getAvailableSeats);

globalRoutes.get('/genres', getGenre);

export default globalRoutes;