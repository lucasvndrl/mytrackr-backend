import { Request, Response } from "express";
import { GetMovieDetailUseCase } from "./GetMovieDetailUseCase";

export class GetMovieDetailController {
  constructor(private getMovieDetailUseCase: GetMovieDetailUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { movieId } = request.params;

    try {
      const movie = await this.getMovieDetailUseCase.execute(movieId);
      console.log(movie);
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
