//src/routes/userRoutes.js
const express = require('express');
const upload = require('../middleware/upload');
const { authenticateUser, authorizeAdmin } = require('../middleware/authMiddleware');
const {
    createUser, 
    editUser, 
    deleteUser, 
    getAllUsers, 
    uploadImage,
    loginUser  
} = require('../controllers/userController');

const { createJob } = require('../controllers/jobController');

const router = express.Router();

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with the specified fullName, email, and password.
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
 */
//router.post('/create', authenticateUser, authorizeAdmin, createUser);
router.post('/create', createUser);

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
router.put('/edit', authenticateUser, editUser); 

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
router.delete('/delete', authenticateUser, deleteUser); 

/**
 * @swagger
 * /user/getAll:
 *   get:
 *     summary: Get all users
 *     description: Fetch a list of all users in the system. Admins only.
 *     responses:
 *       200:
 *         description: List of all users.
 *         content:
 *           application/json:
 *             example:
 *               {
 *                 "users": [
 *                   {
 *                     "fullName": "Jane Doe",
 *                     "email": "jane.doe@domain.com",
 *                     "image": "/uploads/jane.jpg"
 *                   },
 *                   {
 *                     "fullName": "John Smith",
 *                     "email": "john.smith@domain.com",
 *                     "image": "/uploads/john.jpg"
 *                   }
 *                 ]
 *               }
 *       500:
 *         description: Error retrieving users.
 */
router.get('/getAll', authenticateUser, authorizeAdmin, getAllUsers); // Admin only can access this route

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
router.post('/uploadImage', authenticateUser, upload.single('image'), uploadImage);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login user
 *     description: Login a user with the provided email and password.
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
 *                 "message": "Login successful",
 *                 "token": "jwt_token_here"
 *               }
 *       400:
 *         description: Invalid credentials.
 *       500:
 *         description: Server error.
 */
router.post('/login', loginUser); 


module.exports = router;
