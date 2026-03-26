const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema(
  {
    to: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['sent', 'failed'], default: 'sent' },
    error: { type: String },
  },
  { timestamps: true }
);

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
