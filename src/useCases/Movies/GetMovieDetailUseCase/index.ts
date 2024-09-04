import { MoviesRepository } from "../../../repositories/MoviesRepository";
import { ReviewsRepository } from "../../../repositories/ReviewsRepository";
import { GetReviewsFromMovieUseCase } from "../../Reviews/GetReviewsFromMovieUseCase/GetReviewsFromMovieUseCase";
import { GetMovieDetailController } from "./GetMovieDetailController";
import { GetMovieDetailUseCase } from "./GetMovieDetailUseCase";

const moviesRepository = new MoviesRepository();
const reviewsRepository = new ReviewsRepository();

const getMovieDetailUseCase = new GetMovieDetailUseCase(moviesRepository);
const getReviewsFromMovieUseCase = new GetReviewsFromMovieUseCase(
  reviewsRepository,
  moviesRepository
);

const getMovieDetailController = new GetMovieDetailController(
  getMovieDetailUseCase,
  getReviewsFromMovieUseCase
);

export { getMovieDetailController };
