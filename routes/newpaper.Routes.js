import express from 'express';
import {
  createNewspaper,
  getAllNewspapers,
  getNewspaperById,
  updateNewspaper,
  deleteNewspaper,
} from '../controller/newpaper.controller.js';

const router = express.Router();

// Route to create a new newspaper
router.post('/newspapers', createNewspaper);

// Route to get all newspapers
router.get('/newspapers', getAllNewspapers);

// Route to get a single newspaper by ID
router.get('/newspapers/:id', getNewspaperById);

// Route to update a newspaper by ID
router.put('/newspapers/:id', updateNewspaper);

// Route to delete a newspaper by ID
router.delete('/newspapers/:id', deleteNewspaper);

export default router;

