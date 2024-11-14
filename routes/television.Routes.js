import express from 'express';
import {
  createTelevision,
  getAllTelevisions,
  getTelevisionById,
  updateTelevision,
  deleteTelevision,
} from '../controller/televisionCard.controller.js';

const router = express.Router();

// Route to create a new television
router.post('/televisions', createTelevision);

// Route to get all televisions with filtering, sorting, and pagination
router.get('/televisions', getAllTelevisions);

// Route to get a single television by ID
router.get('/televisions/:id', getTelevisionById);

// Route to update a television by ID
router.put('/televisions/:id', updateTelevision);

// Route to delete a television by ID
router.delete('/televisions/:id', deleteTelevision);

export default router;
