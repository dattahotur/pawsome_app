const Booking = require('../models/bookingModel');

const createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    const createdBooking = await booking.save();
    
    // In a full implementation, we would send a message via RabbitMQ/Kafka to Notification Service here
    console.log(`Mocking out notification trigger for new booking: ${createdBooking._id}`);
    
    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).sort({ date: 1, time: 1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRequestsForSeller = async (req, res) => {
  try {
    const requests = await Booking.find({ sellerId: req.params.sellerId, serviceType: 'Meetup' }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (booking) {
      booking.status = req.body.status || booking.status;
      booking.doctor = req.body.doctor || booking.doctor;
      const updatedBooking = await booking.save();
      res.json(updatedBooking);
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addMessage = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    
    booking.messages.push({
      senderId: req.body.senderId,
      senderName: req.body.senderName,
      text: req.body.text
    });
    
    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createBooking, getUserBookings, getRequestsForSeller, updateBookingStatus, addMessage };
