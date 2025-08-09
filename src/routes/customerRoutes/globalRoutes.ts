import express from 'express'
import { getAvailableSeats, getGenre, getMovieDetail, getMovies, getMoviesFilter, } from '../../controller/globalController'

const globalRoutes = express.Router()

globalRoutes.get('/movies', getMovies);
globalRoutes.get('/movies/:id', getMovieDetail);
globalRoutes.get('/check-seats/:movieId', getAvailableSeats);
globalRoutes.get('/browse-movies/:genreId', getMoviesFilter);

globalRoutes.get('/genres', getGenre);

export default globalRoutes;