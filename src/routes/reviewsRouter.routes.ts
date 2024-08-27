import express from "express";
import { createReviewController } from "../useCases/Reviews/CreateReviewUseCase";
import { getReviewsFromMovieController } from "../useCases/Reviews/GetReviewsFromMovieUseCase";

const reviewsRouter = express.Router();

reviewsRouter.post("/", express.json(), (req, res) => {
  createReviewController.handle(req, res);
});

reviewsRouter.get("/:movieId", (req, res) =>
  getReviewsFromMovieController.handle(req, res)
);

export default reviewsRouter;
