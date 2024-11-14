import express from 'express';
import { 
  getOutdoors, 
  getOutdoorById, 
  createOutdoor, 
  updateOutdoor, 
  deleteOutdoor 
} from '../controller/outdoorCard.Controller.js'; // Import the controller functions

const router = express.Router();

// Route to get all outdoor media
router.get('/', getOutdoors); // GET /api/outdoors

// Route to get a single outdoor media by ID
router.get('/:outdoorId', getOutdoorById); // GET /api/outdoors/:outdoorId

// Route to create a new outdoor media
router.post('/create', createOutdoor); // POST /api/outdoors/create

// Route to update an existing outdoor media by ID
router.put('/:outdoorId', updateOutdoor); // PUT /api/outdoors/:outdoorId

// Route to delete an outdoor media by ID
router.delete('/:outdoorId', deleteOutdoor); // DELETE /api/outdoors/:outdoorId

export default router;
