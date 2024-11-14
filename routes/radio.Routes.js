import express from 'express';
import {
  getRadios,
  getRadioById,
  createRadio,
  updateRadio,
  deleteRadio
} from '../controller/radioCard.Controller.js'; // Path to the radio controller

const router = express.Router();

// Route to get all radios with optional filters
router.get('/', getRadios); // GET /api/radios?location=&language=&targetAudience=&price=

// Route to get a single radio by ID
router.get('/:radioId', getRadioById); // GET /api/radios/:radioId

// Route to create a new radio
router.post('/create', createRadio); // POST /api/radios/create

// Route to update an existing radio by ID
router.put('/:radioId', updateRadio); // PUT /api/radios/:radioId

// Route to delete a radio by ID
router.delete('/:radioId', deleteRadio); // DELETE /api/radios/:radioId

export default router;
