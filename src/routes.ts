import express from "express";
import {
  deleteAccount,
  getAccountDetails,
  getAllAccounts,
  saveAccount,
  updateAccountDetails,
} from "./controller/AccountController";
import { getPopularMoviesList } from "./controller/MovieController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Account
 *  description: API endopints to manage user accounts
 */

/**
 * @swagger
 * /account:
 *   post:
 *     summary: Save an account
 *     tags: [Account]
 *     description: Creates and saves a new account in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               account:
 *                 required:
 *                   - user_id
 *                   - username
 *                   - email
 *                   - created_at
 *                   - last_login
 *                   - favorite_genres
 *                 type: object
 *                 properties:
 *                   user_id:
 *                     type: string
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   last_login:
 *                     type: string
 *                     format: date-time
 *                   favorite_genres:
 *                     type: array
 *                     items:
 *                       type: string
 *                   avatar:
 *                     type: string
 *                     format: binary
 *     responses:
 *       200:
 *         description: Account saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Account saved successfully
 *       500:
 *         description: Cannot save account. Try again later.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cannot save account. Try again later.
 */
router.post("/account", express.json(), (req, res) => {
  saveAccount(req, res);
});

/**
 * @swagger
 * /account:
 *   get:
 *     summary: Get account details
 *     tags: [Account]
 *     description: Retrieve account details based on the authenticated user.
 *     responses:
 *       200:
 *         description: Account details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 account:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     last_login:
 *                       type: string
 *                       format: date-time
 *                     favorite_genres:
 *                       type: array
 *                       items:
 *                         type: string
 *                     avatar:
 *                       type: string
 *                       format: binary
 *       404:
 *         description: Account not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Account not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.get("/account", getAccountDetails);

/**
 * @swagger
 * /account:
 *   patch:
 *     summary: Update account details
 *     tags: [Account]
 *     description: Updates account details based on the authenticated user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               account:
 *                 required:
 *                   - email
 *                   - username
 *                   - avatar
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   username:
 *                     type: string
 *                   avatar:
 *                     type: string
 *                     format: binary
 *     responses:
 *       200:
 *         description: Account updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Account updated.
 *       404:
 *         description: Account not found or no changes made
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Account not found or no changes made
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.patch("/account", express.json(), updateAccountDetails);

/**
 * @swagger
 * /account:
 *   delete:
 *     summary: Delete account
 *     tags: [Account]
 *     description: Deletes the account based on the authenticated user.
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Account deleted.
 *       500:
 *         description: Account deletion failed. Try again later.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Account deletion failed. Try again later.
 */
router.delete("/account", deleteAccount);

export default router;
