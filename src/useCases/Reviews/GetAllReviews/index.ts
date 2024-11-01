import { AccountRepository } from "../../../repositories/AccountRepository";
import { MoviesRepository } from "../../../repositories/MoviesRepository";
import { ReviewsRepository } from "../../../repositories/ReviewsRepository";
import { GetAccountDetailsUseCase } from "../../Account/GetAccountDetails/GetAccountDetailsUseCase";
import { GetMovieDetailUseCase } from "../../Movies/GetMovieDetailUseCase/GetMovieDetailUseCase";
import { GetAllReviewsController } from "./GetAllReviewsController";
import { GetAllReviewsUseCase } from "./GetAllReviewsUseCase";

const reviewsRepository = new ReviewsRepository();
const moviesRepository = new MoviesRepository();
const accountRepository = new AccountRepository();

const getAllReviewsUseCase = new GetAllReviewsUseCase(reviewsRepository);
const getMovieDetailUseCase = new GetMovieDetailUseCase(moviesRepository);
const getAccountDetailsUseCase = new GetAccountDetailsUseCase(
  accountRepository
);

const getAllReviewsController = new GetAllReviewsController(
  getAllReviewsUseCase,
  getMovieDetailUseCase,
  getAccountDetailsUseCase
);

export { getAllReviewsController };
