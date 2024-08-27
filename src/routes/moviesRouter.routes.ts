import express from "express";
import { getAllMoviesController } from "../useCases/Movies/GetAllMoviesUseCase";
import { getMovieDetailController } from "../useCases/Movies/GetMovieDetailUseCase";

const moviesRouter = express.Router();

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
 *               properties:
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

moviesRouter.get("/:movieId", (req, res) =>
  getMovieDetailController.handle(req, res)
);

export default moviesRouter;
