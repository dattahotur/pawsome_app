const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const petRoutes = require('./routes/petRoutes');

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/pets', petRoutes);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Pet Service running on port ${PORT}`);
});
