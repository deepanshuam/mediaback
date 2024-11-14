import express from 'express';
import {
  createBTL,
  getBTLs,
  getBTLById,
  updateBTL,
  deleteBTL,
} from '../controller/btl.controller.js';

const router = express.Router();

// Route to create a new BTL media
router.post('/btl', createBTL);

router.get('/btls', getBTLs);

// Route to get a single BTL media by ID
router.get('/btl/:id', getBTLById);

// Route to update an existing BTL media by ID
router.put('/btl/:id', updateBTL);

// Route to delete a BTL media by ID
router.delete('/btl/:id', deleteBTL);

export default router;
