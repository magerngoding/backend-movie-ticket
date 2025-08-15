import express from 'express'
import { getAvailableSeats, getGenre, getMovieDetail, getMovies, getMoviesFilter, } from '../../controller/globalController'
import { validateRequest } from '../../middleware/validateRequest';
import { getOrderDetail, getOrders, transactionTicket } from '../../controller/ticketController';
import { transactionSchema } from '../../utils/zodSchema';

const globalRoutes = express.Router()

globalRoutes.get('/movies', getMovies);
globalRoutes.get('/movies/:id', getMovieDetail);
globalRoutes.get('/check-seats/:movieId', getAvailableSeats);
globalRoutes.get('/browse-movies/:genreId', getMoviesFilter);
globalRoutes.post(
    '/transaction/buy',
    validateRequest(transactionSchema),
    transactionTicket
);
globalRoutes.get('/orders', getOrders);
globalRoutes.get('/order/:id', getOrderDetail);

globalRoutes.get('/genres', getGenre);

export default globalRoutes;