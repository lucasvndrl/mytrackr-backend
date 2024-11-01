import { ReviewsTable } from "../types";

export interface IReviewsRepository {
  save(review: ReviewsTable): Promise<void>;
  getReviews(movieId: string): Promise<ReviewsTable[]>;
  getAllReviews(): Promise<ReviewsTable[]>;
}
