// src/middleware/authMiddleware.js:
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

const authenticateUser = async (req, res, next) => {
    try {
        // Log the authorization header for debugging
        console.log("Authorization header:", req.header('Authorization'));
        
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            console.log("No Authorization header found");
            return res.status(401).json({ error: 'Please authenticate' });
        }

        // Extract token from the Authorization header
        const token = authHeader.replace('Bearer ', '');
        
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", { id: decoded.id, type: decoded.type });
        
        // Find user by ID
        const user = await User.findOne({ _id: decoded.id });

        if (!user) {
            console.log(`User not found with ID: ${decoded.id}`);
            return res.status(401).json({ error: 'Authentication failed' });
        }

        console.log(`User authenticated: ${user.email} (${user.type})`);
        
        // Attach user to request
        req.user = user;
        next();
    } catch (error) {
        // Detailed error handling
        if (error.name === 'JsonWebTokenError') {
            console.error("JWT Error:", error.message);
            return res.status(401).json({ error: 'Invalid token' });
        } else if (error.name === 'TokenExpiredError') {
            console.error("Token expired:", error.message);
            return res.status(401).json({ error: 'Token expired, please login again' });
        } else {
            console.error("Authentication error:", error);
            return res.status(401).json({ error: 'Please authenticate' });
        }
    }
};

const authorizeAdmin = (req, res, next) => {
    // Check if the authenticated user is an admin
    if (req.user.type !== 'admin') {
        console.log(`Access denied for user ${req.user.email}: not an admin`);
        return res.status(403).json({ error: 'Access denied. Admins only' });
    }
    
    console.log(`Admin access granted for user: ${req.user.email}`);
    next();
};

const authorizeEmployee = (req, res, next) => {
    if (req.user.type !== 'employee' && req.user.type !== 'admin') {
        console.log(`Access denied for user ${req.user.email}: not an employee or admin`);
        return res.status(403).json({ error: 'Access denied. Employees or admins only' });
    }
    
    console.log(`Employee access granted for user: ${req.user.email}`);
    next();
};

module.exports = { authenticateUser, authorizeAdmin, authorizeEmployee };