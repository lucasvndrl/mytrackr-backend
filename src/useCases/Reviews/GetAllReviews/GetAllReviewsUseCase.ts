import { IReviewsRepository } from "../../../repositories/IReviewsRepository";
import { ReviewsTable } from "../../../types";

export class GetAllReviewsUseCase {
  constructor(private reviewsRepository: IReviewsRepository) {}

  async execute(): Promise<ReviewsTable[]> {
    const reviews = await this.reviewsRepository.getAllReviews();
    return reviews;
  }
}