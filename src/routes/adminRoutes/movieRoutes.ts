import express from 'express'
import multer from 'multer';
import { createMovie, getMovies } from '../../controller/movieController';
import { imageFilter, thumbnailStorage } from '../../utils/multer';

const upload = multer({ storage: thumbnailStorage(), fileFilter: imageFilter })

const movieRoutes = express.Router();

movieRoutes.get('/movies', getMovies);
movieRoutes.post('/movies', upload.single('thumbnail'), createMovie);

export default movieRoutes;