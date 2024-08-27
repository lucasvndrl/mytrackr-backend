import { MoviesRepository } from "../../../repositories/MoviesRepository";
import { GetMovieDetailController } from "./GetMovieDetailController";
import { GetMovieDetailUseCase } from "./GetMovieDetailUseCase";

const moviesRepository = new MoviesRepository();

const getMovieDetailUseCase = new GetMovieDetailUseCase(moviesRepository);

const getMovieDetailController = new GetMovieDetailController(
  getMovieDetailUseCase
);

export { getMovieDetailController };
