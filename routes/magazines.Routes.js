import express from 'express';
import { getMediaItems, getMediaItemById, createMediaItem, updateMediaItem, deleteMediaItem } from '../controller/magazine.Controller.js';

const router = express.Router();

// Route to get all media items with optional filters and sorting
router.get('/media-items', getMediaItems);

// Route to get a single media item by ID
router.get('/media-items/:mediaItemId', getMediaItemById);

// Route to create a new media item
router.post('/media-items', createMediaItem);

// Route to update an existing media item by ID
router.put('/media-items/:mediaItemId', updateMediaItem);

// Route to delete a media item by ID
router.delete('/media-items/:mediaItemId', deleteMediaItem);

export default router;
