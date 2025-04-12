//src/controllers/jobController.js
const Job = require('../models/job');

/**
 * @swagger
 * /job/create:
 *   post:
 *     summary: Create a new job
 *     description: Creates a job listing that will be stored in the database.
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - companyName
 *               - jobTitle
 *               - description
 *               - salary
 *             properties:
 *               companyName:
 *                 type: string
 *                 example: "ABC Corp"
 *               jobTitle:
 *                 type: string
 *                 example: "Software Engineer"
 *               description:
 *                 type: string
 *                 example: "Develop and maintain software applications."
 *               salary:
 *                 type: string
 *                 example: "100000"
 *     responses:
 *       201:
 *         description: Job created successfully
 *       500:
 *         description: Internal server error
 */
exports.createJob = async (req, res) => {
    try {
        const { companyName, jobTitle, description, salary } = req.body;

        const job = new Job({
            companyName,
            jobTitle,
            description,
            salary,
            createdBy: req.user._id 
        });

        await job.save();
        res.status(201).json({ message: 'Job created successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating job. Please try again later.' });
    }
};
