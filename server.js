const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();  // ✅ Naya line add karo

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Environment variables use karo
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err));

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));