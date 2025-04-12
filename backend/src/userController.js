//src/controllers/userController.js:
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const upload = require('../middleware/upload');
const jwt = require('jsonwebtoken');

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with the specified fullName, email, password, and type.
 *     parameters:
 *       - name: fullName
 *         in: body
 *         description: The full name of the user.
 *         required: true
 *         type: string
 *         example: "Jane Doe"
 *       - name: email
 *         in: body
 *         description: The email of the user.
 *         required: true
 *         type: string
 *         example: "jane.doe@domain.com"
 *       - name: password
 *         in: body
 *         description: The password of the user.
 *         required: true
 *         type: string
 *         example: "P@ssw0rd123!"
 *       - name: type
 *         in: body
 *         description: The type of the user. It can either be "admin" or "employee".
 *         required: true
 *         type: string
 *         enum: ["admin", "employee"]
 *         example: "employee"
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             example: 
 *               {
 *                 "message": "User created successfully."
 *               }
 *       400:
 *         description: Bad request, validation failed.
 *         content:
 *           application/json:
 *             example:
 *               {
 *                 "error": "Email must be from gmail.com or northeastern.edu."
 *               }
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               {
 *                 "error": "Error creating user. Please try again later."
 *               }
 */


exports.createUser = async (req, res) => {
    try {
        const { fullName, email, password, type } = req.body;

        const emailPattern = /^[a-zA-Z0-9._-]+@(gmail\.com|northeastern\.edu)$/;
        if (!emailPattern.test(email)) {
            return res.status(400).json({ error: 'Email must be from gmail.com or northeastern.edu.' });
        }

        const namePattern = /^[A-Za-z\s]+$/;
        if (!namePattern.test(fullName)) {
            return res.status(400).json({ error: 'Full name must contain only alphabetic characters and spaces.' });
        }

        const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!strongPassword.test(password)) {
            return res.status(400).json({ error: 'Weak password. Must contain uppercase, lowercase, number, and special character.' });
        }

        if (type !== 'admin' && type !== 'employee') {
            return res.status(400).json({ error: 'Invalid user type. Type must be either "admin" or "employee".' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            fullName,
            email,
            password: hashedPassword,
            type 
        });

        await user.save();

        res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating user. Please try again later.' });
    }
};


/**
 * @swagger
 * /user/edit:
 *   put:
 *     summary: Update user details
 *     description: Update user details including fullName and password.
 *     parameters:
 *       - name: email
 *         in: body
 *         description: The email of the user to update.
 *         required: true
 *         type: string
 *         example: "jane.doe@domain.com"
 *       - name: fullName
 *         in: body
 *         description: The full name of the user.
 *         required: false
 *         type: string
 *         example: "Jane A. Doe"
 *       - name: password
 *         in: body
 *         description: The new password of the user.
 *         required: false
 *         type: string
 *         example: "NewP@ssw0rd!"
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       404:
 *         description: User not found.
 *       400:
 *         description: Bad request, validation failed.
 */
exports.editUser = async (req, res) => {
    try {
        const { email, fullName, password } = req.body;

        // Validate the email
        if (!email) return res.status(400).json({ error: 'Email is required to update user.' });

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found.' });

        // Validate full name
        if (fullName && !/^[A-Za-z\s]+$/.test(fullName)) {
            return res.status(400).json({ error: 'Full name must contain only alphabetic characters and spaces.' });
        }

        // Validate password strength
        if (password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
            return res.status(400).json({ error: 'Weak password. Must contain uppercase, lowercase, number, and special character.' });
        }

        // Update user details
        if (fullName) user.fullName = fullName;
        if (password) user.password = await bcrypt.hash(password, 10);

        // Save updated user
        await user.save();

        // Respond with success
        res.status(200).json({ message: 'User updated successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating user. Please try again later.' });
    }
};

/**
 * @swagger
 * /user/delete:
 *   delete:
 *     summary: Delete a user by email
 *     description: Delete a user by providing their email.
 *     parameters:
 *       - name: email
 *         in: body
 *         description: The email of the user to delete.
 *         required: true
 *         type: string
 *         example: "jane.doe@domain.com"
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               {
 *                 "message": "User deleted successfully."
 *               }
 *       404:
 *         description: User not found.
 *       400:
 *         description: Bad request, email required.
 */
exports.deleteUser = async (req, res) => {
    try {
        const { email } = req.body;

        // Validate email
        if (!email) return res.status(400).json({ error: 'Email is required to delete user.' });

        // Find and delete user by email
        const user = await User.findOneAndDelete({ email });
        if (!user) return res.status(404).json({ error: 'User not found.' });

        // Respond with success
        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting user. Please try again later.' });
    }
};

/**
 * @swagger
 * /user/getAll:
 *   get:
 *     summary: Get all users
 *     description: Fetch a list of all users in the system without exposing passwords.
 *     responses:
 *       200:
 *         description: List of all users without passwords.
 *         content:
 *           application/json:
 *             example:
 *               {
 *                 "users": [
 *                   {
 *                     "fullName": "Jane Doe",
 *                     "email": "jane.doe@domain.com",
 *                     "image": "/uploads/jane.jpg",
 *                     "type": "employee"
 *                   },
 *                   {
 *                     "fullName": "John Smith",
 *                     "email": "john.smith@domain.com",
 *                     "image": "/uploads/john.jpg",
 *                     "type": "admin"
 *                   }
 *                 ]
 *               }
 *       500:
 *         description: Error retrieving users.
 *         content:
 *           application/json:
 *             example:
 *               {
 *                 "error": "Error retrieving users."
 *               }
 */

exports.getAllUsers = async (req, res) => {
    try {
      if (req.user.type !== 'admin') {
        return res.status(403).json({ error: 'Access denied, only admins can view all users.' });
      }
  
      const users = await User.find({}, { password: 0 }); 
      res.status(200).json({ users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving users.' });
    }
};

/**
 * @swagger
 * /user/uploadImage:
 *   post:
 *     summary: Upload an image for a user
 *     description: Upload an image for a user based on the provided email.
 *     parameters:
 *       - name: email
 *         in: body
 *         description: The email of the user.
 *         required: true
 *         type: string
 *         example: "jane.doe@domain.com"
 *       - name: image
 *         in: formData
 *         description: The image file to upload.
 *         required: true
 *         type: file
 *     responses:
 *       201:
 *         description: Image uploaded successfully.
 *         content:
 *           application/json:
 *             example:
 *               {
 *                 "message": "Image uploaded successfully.",
 *                 "filePath": "/uploads/some_image.jpg"
 *               }
 *       400:
 *         description: Bad request, email required or no file uploaded.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error.
 */
exports.uploadImage = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) return res.status(400).json({ error: 'Email is required to upload image.' });

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found.' });

        if (user.image) {
            return res.status(400).json({ error: 'Image already exists for this user.' });
        }

        if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });

        const validImageFormats = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validImageFormats.includes(req.file.mimetype)) {
            return res.status(400).json({ error: 'Invalid file format. Only JPEG, PNG, and GIF are allowed.' });
        }

        user.image = `/uploads/${req.file.filename}`;
        await user.save();

        res.status(201).json({
            message: 'Image uploaded successfully.',
            filePath: user.image,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error while uploading the image.' });
    }
};

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: User login
 *     description: Allows a user to log in with their email and password.
 *     parameters:
 *       - name: email
 *         in: body
 *         description: The email of the user.
 *         required: true
 *         type: string
 *         example: "jane.doe@domain.com"
 *       - name: password
 *         in: body
 *         description: The password of the user.
 *         required: true
 *         type: string
 *         example: "P@ssw0rd123!"
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             example:
 *               {
 *                 "success": true,
 *                 "message": "Login successful",
 *                 "user": {
 *                   "fullName": "Jane Doe",
 *                   "email": "jane.doe@domain.com",
 *                   "image": "/uploads/jane.jpg"
 *                 }
 *               }
 *       400:
 *         description: Invalid email or password.
 *         content:
 *           application/json:
 *             example:
 *               {
 *                 "error": "Invalid email or password"
 *               }
 *       500:
 *         description: Server error during login.
 *         content:
 *           application/json:
 *             example:
 *               {
 *                 "error": "Server error during login"
 *               }
 */
exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign(
        { id: user._id, type: user.type }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
      );
  
      res.status(200).json({
        success: true,
        message: 'Login successful',
        user: {
          fullName: user.fullName,
          email: user.email,
          type: user.type,
          token 
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error during login' });
    }
  };