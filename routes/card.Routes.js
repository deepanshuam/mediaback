import express from 'express';
import {
  getCinemas,
  getCinemaById,
  createCinema,
  updateCinema,
  deleteCinema
} from '../controller/cinemaCard.Controller.js';

const router = express.Router();

// Route to get all cinemas
router.get('/cinemas', getCinemas);

// Route to get a cinema by its ID
router.get('/cinemas/:cinemaId', getCinemaById);

// Route to create a new cinema
router.post('/cinemas', createCinema);

// Route to update a cinema by its ID
router.put('/cinemas/:cinemaId', updateCinema);

// Route to delete a cinema by its ID
router.delete('/cinemas/:cinemaId', deleteCinema);

export default router;
