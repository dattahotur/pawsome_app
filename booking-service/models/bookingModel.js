const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema(
  {
    userId: { type: String, required: true }, // Buyer (Requestor)
    sellerId: { type: String, required: true, default: 'system' }, // Seller (Owner)
    petId: { type: String }, // The pet they want to meet
    serviceType: { type: String, required: true }, // Checkup, Vaccination, Emergency, OR 'Meetup'
    date: { type: String, required: true }, // Format YYYY-MM-DD
    time: { type: String, required: true }, // Format HH:MM AM/PM
    doctor: { type: String, default: 'Unassigned' },
    status: { type: String, enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled', 'Accepted', 'Rejected'], default: 'Pending' },
    messages: [
      {
        senderId: { type: String, required: true },
        senderName: { type: String, required: true },
        text: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
