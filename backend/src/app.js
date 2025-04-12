const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const cors = require('cors');
const mongoose = require('mongoose');

dotenv.config();
connectDB();

const app = express();
app.use(cors());

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Job API',
      description: 'API Documentation for Job and User management',
      version: '1.0.0',
    },
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: 'JWT authorization token',
      },
    },
  },
  apis: [
    './src/routes/userRoutes.js', 
    './src/controllers/userController.js',
    './src/routes/jobRoutes.js', 
    './src/controllers/jobController.js' 
  ],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/user', userRoutes);
app.use('/job', jobRoutes);

// Connect to database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('Error connecting to MongoDB', error));

module.exports = app;
