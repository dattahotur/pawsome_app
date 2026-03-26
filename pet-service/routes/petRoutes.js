const express = require('express');
const { getPets, getPetById, addPet, adoptPet, getMyPets } = require('../controller/petController');

const router = express.Router();

router.route('/').get(getPets).post(addPet);
router.route('/seller/:ownerId').get(getMyPets);
router.route('/:id').get(getPetById);
router.route('/:id/adopt').put(adoptPet);

module.exports = router;
