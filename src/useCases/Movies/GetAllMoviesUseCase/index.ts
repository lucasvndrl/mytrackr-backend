import { MoviesRepository } from "../../../repositories/MoviesRepository";
import { GetAllMoviesController } from "./GetAllMoviesController";
import { GetAllMoviesUseCase } from "./GetAllMoviesUseCase";

const moviesRepository = new MoviesRepository();

const getAllMoviesUseCase = new GetAllMoviesUseCase(moviesRepository);

const getAllMoviesController = new GetAllMoviesController(getAllMoviesUseCase);

export { getAllMoviesController };
