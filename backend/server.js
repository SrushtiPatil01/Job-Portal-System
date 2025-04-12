const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./src/routes/userRoutes');
const connectDB = require('./src/config/db');

dotenv.config();
connectDB();

//const app = express();
const app = require('./src/app');

// Enable CORS
app.use(cors());

// Use JSON middleware
app.use(express.json());

// Serve static files (like images)
app.use('/uploads', express.static('uploads'));

// Use the userRoutes for all "/user" related routes
app.use('/user', userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

