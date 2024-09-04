import { Request, Response } from "express";
import { CreateReviewUseCase } from "./CreateReviewUseCase";
import { randomUUID } from "crypto";

export class CreateReviewController {
  constructor(private createReviewUseCase: CreateReviewUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { movie_id, rating, review_text, reviewer } = request.body;

    const reviewId = randomUUID();

    try {
      await this.createReviewUseCase.execute({
        movie_id: movie_id,
        rating: rating,
        review_id: reviewId,
        review_text: review_text,
        reviewer: reviewer,
      });

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
