const Pet = require('../models/petModel');

// @desc    Fetch all pets
// @route   GET /api/pets
const getPets = async (req, res) => {
  try {
    const filter = req.query.type ? { type: req.query.type, isAdopted: false } : { isAdopted: false };
    const pets = await Pet.find(filter);
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single pet
// @route   GET /api/pets/:id
const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (pet) {
      res.json(pet);
    } else {
      res.status(404).json({ message: 'Pet not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a pet (User selling a pet)
// @route   POST /api/pets
const addPet = async (req, res) => {
  try {
    const pet = new Pet(req.body);
    const createdPet = await pet.save();
    res.status(201).json(createdPet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Adopt a pet
// @route   PUT /api/pets/:id/adopt
const adoptPet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (pet) {
      pet.isAdopted = true;
      pet.adoptedBy = req.body.userId || 'system';
      const updatedPet = await pet.save();
      res.json(updatedPet);
    } else {
      res.status(404).json({ message: 'Pet not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch pets sold by a specific user
// @route   GET /api/pets/seller/:ownerId
const getMyPets = async (req, res) => {
  try {
    const pets = await Pet.find({ ownerId: req.params.ownerId });
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPets, getPetById, addPet, adoptPet, getMyPets };
