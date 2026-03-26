const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { sendEmailNotification } = require('./services/emailService');
const Notification = require('./models/notificationModel');

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Endpoint to trigger notification internally from other services via Gateway/Direct
app.post('/api/notifications/send', async (req, res) => {
  const { to, subject, message } = req.body;
  try {
    await sendEmailNotification(to, subject, message);
    
    // Log to MongoDB
    await Notification.create({ to, subject, message, status: 'sent' });
    
    res.status(200).json({ success: true, message: 'Notification sent and logged' });
  } catch (error) {
    // Log failure to MongoDB
    await Notification.create({ to, subject, message, status: 'failed', error: error.message });
    
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log(`Notification Service running on port ${PORT}`);
});

