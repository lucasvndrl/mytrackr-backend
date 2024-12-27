import { z } from "zod";

const createReviewSchema = z.object({
  movie_id: z.string(),
  review_text: z.string(),
  reviewer: z.string(),
  rating: z.number(),
});

const getReviewsFromMovieSchema = z.object({
  movie_id: z.string(),
});

export { createReviewSchema, getReviewsFromMovieSchema };
