import { Request, Response } from "express";
import { CreateReviewUseCase } from "./CreateReviewUseCase";
import { randomUUID } from "crypto";
import { IMoviesRepository } from "../../../repositories/IMoviesRepository";

export class CreateReviewController {
  constructor(
    private createReviewUseCase: CreateReviewUseCase,
    private moviesRepository: IMoviesRepository
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { movie_id, rating, review_text, reviewer } = request.body;
    console.log(request);
    const reviewId = randomUUID();

    try {
      await this.createReviewUseCase.execute({
        movie_id: movie_id,
        rating: rating,
        review_id: reviewId,
        review_text: review_text,
        reviewer: reviewer,
        review_created: new Date(),
      });

      const movie = await this.moviesRepository.getMoveDetails(movie_id);

      const newMovieRating = Math.round((movie.rating + rating) / 2);

      await this.moviesRepository.updateMovieRating(movie_id, newMovieRating);

      return response.status(201).send({
        message: "Review created successfully.",
      });
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || "Unexpected error.",
      });
    }
  }
}
