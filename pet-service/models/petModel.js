const mongoose = require('mongoose');

const petSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true }, // Dog, Cat, Other
    breed: { type: String, required: true },
    age: { type: Number, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true, default: 'A very good pet.' },
    isAdopted: { type: Boolean, default: false },
    adoptedBy: { type: String, default: null }, // Simple string ID from user-service
    ownerId: { type: String, required: true, default: 'system' }, // The user selling the pet
    image: { type: String, default: '' },
  },
  { timestamps: true }
);

const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;
