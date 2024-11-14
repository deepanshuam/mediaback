import express from 'express';
import {
  getMobileVans,
  getMobileVanById,
  createMobileVan,
  updateMobileVan,
  deleteMobileVan
} from '../controller/mobilevan.Controiller.js';

const router = express.Router();

// Route to create a new Mobile Van
router.post('/mobileVan', createMobileVan);

// Route to get all Mobile Vans with optional filters
router.get('/mobileVans', getMobileVans);

// Route to get a single Mobile Van by ID
router.get('/mobileVan/:vanId', getMobileVanById);

// Route to update an existing Mobile Van by ID
router.put('/mobileVan/:vanId', updateMobileVan);

// Route to delete a Mobile Van by ID
router.delete('/mobileVan/:vanId', deleteMobileVan);

export default router;
