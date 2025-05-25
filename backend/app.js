const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const progressRoutes = require('./routes/progressRoutes.js');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/progress', progressRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB Connected');
  app.listen(3000, () => console.log('Server running on port 3000'));
});