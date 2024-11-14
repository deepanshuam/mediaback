import Newspaper from '../models/television.Model.js';  // Adjust to correct model if necessary

// Create a new newspaper
export const createNewspaper = async (req, res) => {
  try {
    const { title, location, language, price, publicationFrequency } = req.body;

    const newNewspaper = new Newspaper({
      title,
      location,
      language,
      price,
      publicationFrequency,
    });

    await newNewspaper.save();
    res.status(201).json({ message: 'Newspaper created successfully', newNewspaper });
  } catch (error) {
    res.status(400).json({ message: 'Error creating newspaper', error: error.message });
  }
};

// Get all newspapers with filters and optional sorting
export const getAllNewspapers = async (req, res) => {
  try {
    const { title, location, language, price, publicationFrequency, sortBy, sortOrder } = req.query;

    // Build the filter object based on query parameters
    let filter = {};
    if (title) filter.title = { $regex: title, $options: 'i' }; // Case-insensitive search for title
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (language) filter.language = { $regex: language, $options: 'i' };
    if (price) filter.price = price;
    if (publicationFrequency) filter.publicationFrequency = publicationFrequency;

    // Sorting based on 'sortBy' and 'sortOrder'
    let sortCriteria = {};
    if (sortBy) {
      sortCriteria[sortBy] = sortOrder === 'desc' ? -1 : 1;  // Default to ascending (1), descending (-1)
    }

    const newspapers = await Newspaper.find(filter).sort(sortCriteria);
    res.status(200).json(newspapers);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching newspapers', error: error.message });
  }
};

// Get a single newspaper by ID
export const getNewspaperById = async (req, res) => {
  try {
    const newspaper = await Newspaper.findById(req.params.id);
    if (!newspaper) {
      return res.status(404).json({ message: 'Newspaper not found' });
    }
    res.status(200).json(newspaper);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching newspaper', error: error.message });
  }
};

// Update a newspaper by ID
export const updateNewspaper = async (req, res) => {
  try {
    const { title, location, language, price, publicationFrequency } = req.body;
    const updatedNewspaper = await Newspaper.findByIdAndUpdate(
      req.params.id,
      { title, location, language, price, publicationFrequency },
      { new: true } // Return the updated document
    );

    if (!updatedNewspaper) {
      return res.status(404).json({ message: 'Newspaper not found' });
    }

    res.status(200).json({ message: 'Newspaper updated successfully', updatedNewspaper });
  } catch (error) {
    res.status(400).json({ message: 'Error updating newspaper', error: error.message });
  }
};

// Delete a newspaper by ID
export const deleteNewspaper = async (req, res) => {
  try {
    const deletedNewspaper = await Newspaper.findByIdAndDelete(req.params.id);
    if (!deletedNewspaper) {
      return res.status(404).json({ message: 'Newspaper not found' });
    }

    res.status(200).json({ message: 'Newspaper deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting newspaper', error: error.message });
  }
};
