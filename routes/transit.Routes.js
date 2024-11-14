import express from 'express';
import {
  getTransits,
  getTransitById,
  createTransit,
  updateTransit,
  deleteTransit,
} from '../controller/transitCard.Controller.js'; // Import controller functions

const router = express.Router();

// Route to get all transits with optional filters
router.get('/', getTransits); // GET /api/transits?location=&mediaType=&tyre=&minPrice=&maxPrice=

// Route to get a single transit by ID
router.get('/:transitId', getTransitById); // GET /api/transits/:transitId

// Route to create a new transit
router.post('/create', createTransit); // POST /api/transits/create

// Route to update an existing transit by ID
router.put('/:transitId', updateTransit); // PUT /api/transits/:transitId

// Route to delete a transit by ID
router.delete('/:transitId', deleteTransit); // DELETE /api/transits/:transitId

export default router;
