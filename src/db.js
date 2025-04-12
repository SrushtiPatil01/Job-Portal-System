require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Failed: ${error}`);
        process.exit(1);
    }
};

module.exports = connectDB;


//src/controllers/jobController.js:

//src/controllers/userController.js:

//src/middleware/authMiddleware.js:

//src/middleware/upload.js:

//src/models/User.js:
//src/models/job.js:

//src/routes/jobRoutes.js:
//src/routes/userRoutes.js:

//src/app.js:

//server.js:


