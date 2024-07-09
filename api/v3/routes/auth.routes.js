// routes/auth.routes.js
const express = require("express");
const isValidAuth = require("../middleware/validationMiddleware/isValidAuth");


const router = express.Router();
const auth = require("./../controllers/auth.controller");
const isAuthenticated = require("../middleware/authMiddleware/isAuthenticated");


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate and get a JWT token
 *     tags: [Authentication]
 *     description: Authenticate a user and receive a JWT token for further requests.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 required: true
 *                 example: test
 *               password:
 *                 type: string
 *                 required: true
 *                 example: test
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User Login Successful
 *               balance: your_balance
 *               data: your_jwt_token_here
 *       400:
 *         $ref: '#/components/responses/IncorrectParameters'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Incorrect username/password
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

router.post("/login", isValidAuth.isValidLogin, auth.postLogin);

/**
 * @swagger
 * /auth/create-account:
 *   post:
 *     summary: Create a new user account
 *     tags: [Authentication]
 *     description: Create a new user account with the provided details.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 required: true
 *                 example: test
 *               password:
 *                 type: string
 *                 required: true
 *                 example: test
 *               balance:
 *                 type: number
 *                 format: float
 *                 example: 1000.5
 *                 required: true
 *     responses:
 *       201:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Account Created Successfully
 *       400:
 *         description: Incorrect Parameters
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Parameter_error
 *       409:
 *         description: Username Already Exist
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Username Already Exist
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 *       503:
 *         description: Failed to Create New Record
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Failed to create new record
 */

router.post("/create-account", isValidAuth.isValidCreateAccount, auth.postCreateAccount);

/**
 * @swagger
 * /auth/change-password:
 *   put:
 *     summary: Change user account password
 *     tags: [Authentication]
 *     description: Change the user account password with the provided details.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 required: true
 *                 example: test
 *               newPassword:
 *                 type: string
 *                 required: true
 *                 example: test
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Password updated successfully
 *       400:
 *         description: Incorrect current Password
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Incorrect current Password
 *       404:
 *         description: Player does not exist
 *         content:
 *            application/json:
 *              example:
 *                 success: false
 *                 message: Player does not exist
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 *       503:
 *         description: Failed to create new record
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Failed to create new record
 */

router.put("/change-password", [isAuthenticated, isValidAuth.isValidPasswordChange], auth.changePassword);

module.exports = router;
// *               fullname:
// *                 type: string
// *                 required: false
// *               email:
// *                 type: string
// *                 required: false