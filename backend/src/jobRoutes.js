//src/routes/jobRoutes.js
const express = require('express');
const Job = require('../models/job');
const { createJob } = require('../controllers/jobController');
const { authenticateUser, authorizeAdmin, authorizeEmployee } = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * /job/create:
 *   post:
 *     summary: Create a new job
 *     description: Only admin users can create a new job.
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Job details to be created
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
 *               jobTitle:
 *                 type: string
 *               description:
 *                 type: string
 *               salary:
 *                 type: string
 *     responses:
 *       201:
 *         description: Job created successfully
 *       500:
 *         description: Error creating job
 */
router.post('/create', authenticateUser, authorizeAdmin, createJob);

/**
 * @swagger
 * /job/jobs:
 *   get:
 *     summary: Get a list of jobs
 *     description: Only users with 'employee' type can access job listings.
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: The page number to fetch.
 *         required: false
 *         type: integer
 *         default: 1
 *       - name: limit
 *         in: query
 *         description: The number of jobs to fetch per page.
 *         required: false
 *         type: integer
 *         default: 10
 *       - name: sortBy
 *         in: query
 *         description: The field by which to sort the jobs.
 *         required: false
 *         type: string
 *         default: "createdAt"
 *       - name: sortOrder
 *         in: query
 *         description: The order in which to sort the jobs (asc or desc).
 *         required: false
 *         type: string
 *         default: "desc"
 *     responses:
 *       200:
 *         description: List of jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jobs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       companyName:
 *                         type: string
 *                       jobTitle:
 *                         type: string
 *                       description:
 *                         type: string
 *                       salary:
 *                         type: string
 *       403:
 *         description: Access denied for non-employees
 *       500:
 *         description: Error retrieving jobs
 */
router.get('/jobs', authenticateUser, authorizeEmployee, async (req, res) => {
    try {
        // Your route handler code
        const jobs = await Job.find();
        res.status(200).json({ jobs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving jobs.' });
    }
});

router.get('/test-jobs', authenticateUser, async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 6;
      const skip = (page - 1) * limit;
      
      // Get total count for pagination
      const totalJobs = await Job.countDocuments();
      
      // Get paginated results
      const jobs = await Job.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      
      res.status(200).json({ 
        jobs,
        totalJobs,
        currentPage: page,
        totalPages: Math.ceil(totalJobs / limit)
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving jobs.' });
    }
  });

module.exports = router;