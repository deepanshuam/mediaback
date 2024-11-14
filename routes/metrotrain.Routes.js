import express from 'express';
import {
  getMetroTrains,
  getMetroTrainById,
  createMetroTrain,
  updateMetroTrain,
  deleteMetroTrain,
} from '../controller/metrotrain.Controller.js';

const router = express.Router();

// Route to get all MetroTrains with optional filters
router.get('/metrotrains', getMetroTrains);

// Route to get a single MetroTrain by ID
router.get('/metrotrains/:id', getMetroTrainById);

// Route to create a new MetroTrain
router.post('/metrotrains', createMetroTrain);

// Route to update an existing MetroTrain by ID
router.put('/metrotrains/:id', updateMetroTrain);

// Route to delete a MetroTrain by ID
router.delete('/metrotrains/:id', deleteMetroTrain);

export default router;
