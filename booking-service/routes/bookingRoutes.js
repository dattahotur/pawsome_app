const express = require('express');
const { createBooking, getUserBookings, getRequestsForSeller, updateBookingStatus, addMessage } = require('../controller/bookingController');

const router = express.Router();

router.route('/').post(createBooking);
router.route('/user/:userId').get(getUserBookings);
router.route('/seller/:sellerId').get(getRequestsForSeller);
router.route('/:id').put(updateBookingStatus);
router.route('/:id/message').post(addMessage);

module.exports = router;
