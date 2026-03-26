const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());

// Microservice Routes via HTTP Proxy
app.use('/api/users', createProxyMiddleware({ target: 'http://localhost:5001', changeOrigin: true }));
app.use('/api/pets', createProxyMiddleware({ target: 'http://localhost:5002', changeOrigin: true }));
app.use('/api/bookings', createProxyMiddleware({ target: 'http://localhost:5003', changeOrigin: true }));
app.use('/api/notifications', createProxyMiddleware({ target: 'http://localhost:5004', changeOrigin: true }));

app.get('/', (req, res) => {
  res.send('API Gateway is running. Route to /api/...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API Gateway routing on port ${PORT}`);
});
