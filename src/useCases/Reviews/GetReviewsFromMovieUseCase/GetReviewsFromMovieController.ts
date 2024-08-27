import { Request, Response } from "express";
import { GetReviewsFromMovieUseCase } from "./GetReviewsFromMovieUseCase";

export class GetReviewsFromMovieController {
  constructor(private getReviewsFromMovieUseCase: GetReviewsFromMovieUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { movieId } = request.params;

    try {
      const reviews = await this.getReviewsFromMovieUseCase.execute(movieId);

      return response.status(200).json(reviews);
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || "Unexpected error.",
      });
    }
  }
}
