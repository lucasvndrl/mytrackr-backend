import { Request, Response } from "express";
import { GetAllReviewsUseCase } from "./GetAllReviewsUseCase";
import { GetAllReviewsDTO } from "./GetAllReviewsDTO";
import { ReviewsTable } from "../../../types";
import { GetMovieDetailUseCase } from "../../Movies/GetMovieDetailUseCase/GetMovieDetailUseCase";
import { GetAccountDetailsUseCase } from "../../Account/GetAccountDetails/GetAccountDetailsUseCase";

export class GetAllReviewsController {
  constructor(
    private getAllReviewsUseCase: GetAllReviewsUseCase,
    private getMovieDetailsUseCase: GetMovieDetailUseCase,
    private getAccountDetailsUseCase: GetAccountDetailsUseCase
  ) {}

  async handle(
    request: Request,
    response: Response
  ): Promise<Response<GetAllReviewsDTO>> {
    try {
      const reviews = await this.getAllReviewsUseCase.execute();
      const transformedReviews = await this.transformResponse(reviews);

      return response.status(200).json(transformedReviews);
    } catch (error: any) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }

  async transformResponse(reviews: ReviewsTable[]) {
    console.log(JSON.stringify(reviews, null, 2));
    const transformedResponse = reviews.map(async (review) => {
      const movie = await this.getMovieDetailsUseCase.execute(review.movie_id);
      const reviewerAccount = await this.getAccountDetailsUseCase.execute(
        review.reviewer
      );
      return {
        review_id: review.review_id,
        movie_id: review.movie_id,
        review_text: review.review_text,
        rating: review.rating,
        reviewer: review.reviewer,
        movie_title: movie.title,
        reviewer_name: reviewerAccount.username ?? "",
        reviewer_avatar: reviewerAccount.avatar ?? "",
      } as GetAllReviewsDTO;
    });

    return Promise.all(transformedResponse);
  }
}
