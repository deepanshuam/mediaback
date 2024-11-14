import express from 'express';
import { getAirports, getAirportById, createAirport, updateAirport, deleteAirport } from '../controller/airport.Controller.js';

const router = express.Router();

// Route to get all airports with optional filters
router.get('/airports', getAirports);

// Route to get a single airport by ID
router.get('/airports/:airportId', getAirportById);

// Route to create a new airport
router.post('/airports', createAirport);

// Route to update an existing airport by ID
router.put('/airports/:airportId', updateAirport);

// Route to delete an airport by ID
router.delete('/airports/:airportId', deleteAirport);

export default router;
