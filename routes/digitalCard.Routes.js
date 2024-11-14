import express from 'express';
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
} from '../controller/digitalCard.Controller.js'; // Import the controller functions

const router = express.Router();

// Route to get all items with optional filters
router.get('/', getItems); // GET /api/items?category=&language=&priceModel=&minPrice=&maxPrice=

// Route to get a single item by ID
router.get('/:itemId', getItemById); // GET /api/items/:itemId

// Route to create a new item
router.post('/create', createItem); // POST /api/items

// Route to update an existing item by ID
router.put('/:itemId', updateItem); // PUT /api/items/:itemId

// Route to delete an item by ID
router.delete('/:itemId', deleteItem); // DELETE /api/items/:itemId

export default router;
