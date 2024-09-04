import { db } from "../database";
import { ReviewsTable } from "../types";
import { IReviewsRepository } from "./IReviewsRepository";

export class ReviewsRepository implements IReviewsRepository {
  private repo = db;
  async save(review: ReviewsTable): Promise<void> {
    await this.repo.transaction().execute(async (trx) => {
      await trx
        .insertInto("reviews")
        .values({
          review_id: review.review_id,
          movie_id: review.movie_id,
          review_text: review.review_text,
          rating: review.rating,
          reviewer: review.reviewer,
        })
        .execute();
    });
  }

  async getReviews(movieId: string): Promise<ReviewsTable[]> {
    const reviews = await this.repo
      .selectFrom("reviews")
      .selectAll()
      .where("movie_id", "=", movieId)
      .execute();

    return reviews as ReviewsTable[];
  }
}
