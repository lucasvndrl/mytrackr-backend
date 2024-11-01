import express from "express";
import { getAllMoviesController } from "../useCases/Movies/GetAllMoviesUseCase";
import { getMovieDetailController } from "../useCases/Movies/GetMovieDetailUseCase";

const moviesRouter = express.Router();

/**
 * @swagger
 * tags:
 *  name: Movies
 *  description: API endopints to manage movies
 */

/**
 * @swagger
 * /movies/:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
 *     description: Retrieve all movies.
 *     responses:
 *       200:
 *         description: All movies retrived successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                   type: object
 *                   properties:
 *                     movie_id:
 *                       type: number
 *                     title:
 *                       type: string
 *                     synopsis:
 *                       type: string
 *                     directed_by:
 *                       type: string
 *                     duration:
 *                       type: string
 *                     rating:
 *                       type: string
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
moviesRouter.get("/", (req, res) => getAllMoviesController.handle(req, res));

/**
 * @swagger
 * /movies/movieId:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
 *     description: Retrieve all details from a movie.
 *     responses:
 *       200:
 *         description: Movie details retrived successfully
 *         content:
 *           application/json:
 *             schema:
 *                type: array
 *                items:
 *                   type: object
 *                   properties:
 *                     movie_id:
 *                       type: number
 *                     title:
 *                       type: string
 *                     synopsis:
 *                       type: string
 *                     directed_by:
 *                       type: string
 *                     duration:
 *                       type: string
 *                     rating:
 *                       type: string
 *
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
 *       404:
 *         description: Movie not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Movie not found.
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
moviesRouter.get("/:movieId", (req, res) =>
  getMovieDetailController.handle(req, res)
);

export default moviesRouter;
