import { MoviesRepository } from "../../../repositories/MoviesRepository";
import { ReviewsRepository } from "../../../repositories/ReviewsRepository";
import { GetReviewsFromMovieController } from "./GetReviewsFromMovieController";
import { GetReviewsFromMovieUseCase } from "./GetReviewsFromMovieUseCase";

const reviewsRepository = new ReviewsRepository();
const moviesRepository = new MoviesRepository();

const getReviewsFromMovieUseCase = new GetReviewsFromMovieUseCase(
  reviewsRepository,
  moviesRepository
);

const getReviewsFromMovieController = new GetReviewsFromMovieController(
  getReviewsFromMovieUseCase
);

export { getReviewsFromMovieController };
