import Television from '../models/television.Model.js';

// Create a new television
export const createTelevision = async (req, res) => {
  try {
    const { title, location, channel, genre, language, price } = req.body;

    const newTelevision = new Television({
      title,
      location,
      channel,
      genre,
      language,
      price,
    });

    await newTelevision.save();
    res.status(201).json({ message: 'Television created successfully', newTelevision });
  } catch (error) {
    res.status(400).json({ message: 'Error creating television', error: error.message });
  }
};

// Get all televisions with filtering, sorting, and pagination
export const getAllTelevisions = async (req, res) => {
  try {
    const { title, location, genre, language, sortBy, sortOrder, page = 1, limit = 10 } = req.query;

    // Build the filter object based on query parameters
    let filter = {};
    if (title) filter.title = { $regex: title, $options: 'i' };  // Case-insensitive search
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (genre) filter.genre = { $regex: genre, $options: 'i' };
    if (language) filter.language = { $regex: language, $options: 'i' };

    // Sorting based on 'sortBy' and 'sortOrder' query params
    let sortCriteria = {};
    if (sortBy) {
      sortCriteria[sortBy] = sortOrder === 'desc' ? -1 : 1; // Default to ascending (1), descending (-1)
    }

    // Pagination - Calculate skip value
    const skip = (page - 1) * limit;

    // Fetch televisions with filtering, sorting, and pagination
    const televisions = await Television.find(filter).sort(sortCriteria).skip(skip).limit(Number(limit));

    // Get total count of televisions for pagination metadata
    const totalCount = await Television.countDocuments(filter);

    res.status(200).json({
      message: 'Televisions retrieved successfully',
      televisions,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching televisions', error: error.message });
  }
};

// Get a single television by ID
export const getTelevisionById = async (req, res) => {
  try {
    const television = await Television.findById(req.params.id);
    if (!television) {
      return res.status(404).json({ message: 'Television not found' });
    }
    res.status(200).json(television);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching television', error: error.message });
  }
};

// Update a television by ID
export const updateTelevision = async (req, res) => {
  try {
    const { title, location, channel, genre, language, price } = req.body;
    const updatedTelevision = await Television.findByIdAndUpdate(
      req.params.id,
      { title, location, channel, genre, language, price },
      { new: true } // Return the updated document
    );

    if (!updatedTelevision) {
      return res.status(404).json({ message: 'Television not found' });
    }

    res.status(200).json({ message: 'Television updated successfully', updatedTelevision });
  } catch (error) {
    res.status(400).json({ message: 'Error updating television', error: error.message });
  }
};

// Delete a television by ID
export const deleteTelevision = async (req, res) => {
  try {
    const deletedTelevision = await Television.findByIdAndDelete(req.params.id);
    if (!deletedTelevision) {
      return res.status(404).json({ message: 'Television not found' });
    }

    res.status(200).json({ message: 'Television deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting television', error: error.message });
  }
};
