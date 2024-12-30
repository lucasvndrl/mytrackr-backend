import { z } from "zod";

const createReviewSchema = z.object({
  movie_id: z.string(),
  review_text: z.string().min(15).max(250, {
    message: "Review must contain between 15 and 250 characters",
  }),
  reviewer: z.string(),
  rating: z.number().int().min(1).max(5),
});

const getReviewsFromMovieSchema = z.object({
  movieId: z.string().refine((value) => !isNaN(parseInt(value)), {
    message: "movieId must be a valid number",
  }),
});

export { createReviewSchema, getReviewsFromMovieSchema };
