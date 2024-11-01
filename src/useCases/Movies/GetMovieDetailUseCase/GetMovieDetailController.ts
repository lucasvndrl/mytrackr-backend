import { Request, Response } from "express";
import { GetMovieDetailUseCase } from "./GetMovieDetailUseCase";
import { GetReviewsFromMovieUseCase } from "../../Reviews/GetReviewsFromMovieUseCase/GetReviewsFromMovieUseCase";

export class GetMovieDetailController {
  constructor(
    private getMovieDetailUseCase: GetMovieDetailUseCase,
    private getReviewsFromMovieUseCase: GetReviewsFromMovieUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { movieId } = request.params;

    try {
      const movie = await this.getMovieDetailUseCase.execute(movieId);

      const movieReviews = await this.getReviewsFromMovieUseCase.execute(
        movieId
      );

      movie.rating =
        movieReviews
          .filter((review) => review.movie_id === movieId)
          .reduce((acc, review) => acc + review.rating, 0) /
          movieReviews.length || movie.rating;

      if (movie === undefined) {
        return response.status(404).json({
          message: "Movie not found.",
        });
      }

      return response.json(movie);
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || "Unexpected error.",
      });
    }
  }
}
