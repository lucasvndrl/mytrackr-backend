import express from "express";
import { createReviewController } from "../useCases/Reviews/CreateReviewUseCase";
import { getReviewsFromMovieController } from "../useCases/Reviews/GetReviewsFromMovieUseCase";
import { getAllReviewsController } from "../useCases/Reviews/GetAllReviews";
import { createReviewSchema } from "../schemas/reviewsSchema";
import { z } from "zod";

const reviewsRouter = express.Router();

/**
 * @swagger
 * tags:
 *  name: Reviews
 *  description: API endopints to manage reviews
 */

/**
 * @swagger
 * /reviews/:
 *   post:
 *     summary: Create a Review
 *     tags: [Reviews]
 *     description: Create a Review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                required:
 *                  - movie_id
 *                  - review_text
 *                  - reviewer
 *                  - rating
 *                type: object
 *                properties:
 *                  movie_id:
 *                    type: string
 *                  review_text:
 *                    type: string
 *                  reviewer:
 *                    type: string
 *                  rating:
 *                    type: number
 *     responses:
 *       201:
 *         description: Review created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Review created successfully.
 *       400:
 *         description: Unexpected error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unexpected error.
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
reviewsRouter.post("/", express.json(), (req, res) => {
  try {
    const validatedData = createReviewSchema.parse(req.body);

    req.body = validatedData;

    createReviewController.handle(req, res);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ message: err.errors[0].message });
    }

    return res.status(500).json({ message: "Unexpected error." });
  }
});

/**
 * @swagger
 * /reviews/movieId:
 *   get:
 *     summary: Get all movie reviews
 *     tags: [Reviews]
 *     description: Get all movie reviews
 *     responses:
 *       200:
 *         description: Movie reviews retrived successfully
 *         content:
 *           application/json:
 *            schema:
 *                type: array
 *                items:
 *                   type: object
 *                   properties:
 *                     review_id:
 *                       type: string
 *                     movie_id:
 *                       type: string
 *                     review_text:
 *                       type: string
 *                     reviewer:
 *                       type: string
 *                     rating:
 *                       type: number
 *       400:
 *         description: Unexpected error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unexpected error.
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
reviewsRouter.get("/:movieId", (req, res) =>
  getReviewsFromMovieController.handle(req, res)
);

reviewsRouter.get("/", (req, res) => getAllReviewsController.handle(req, res));

export default reviewsRouter;
