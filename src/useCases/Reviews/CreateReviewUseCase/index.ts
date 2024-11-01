import { MoviesRepository } from "../../../repositories/MoviesRepository";
import { ReviewsRepository } from "../../../repositories/ReviewsRepository";
import { CreateReviewController } from "./CreateReviewController";
import { CreateReviewUseCase } from "./CreateReviewUseCase";

const moviesRepository = new MoviesRepository();
const reviewsRepository = new ReviewsRepository();

const createReviewUseCase = new CreateReviewUseCase(
  reviewsRepository,
  moviesRepository
);

const createReviewController = new CreateReviewController(
  createReviewUseCase,
  moviesRepository
);

export { createReviewController };
