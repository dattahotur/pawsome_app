const nodemailer = require('nodemailer');

// For MVP, we mock the email sending securely. In production, connect SMTP here.
const sendEmailNotification = async (to, subject, message) => {
  console.log('------------------------------------------------');
  console.log(`[Notification Service Mock] SENDING EMAIL`);
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Message: ${message}`);
  console.log('------------------------------------------------');
  
  return Promise.resolve(true); 
};

module.exports = { sendEmailNotification };
