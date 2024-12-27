import { z } from "zod";

const createAccountSchema = z.object({
  account: z.object({
    user_id: z.string(),
    username: z.string(),
    email: z.string().email(),
    created_at: z.string().datetime(),
    last_login: z.string().datetime(),
    favorite_genres: z.array(z.string()),
    avatar: z.string().optional(),
  }),
});

const updateAccountSchema = z.object({
  account: z.object({
    email: z.string().email().optional(),
    username: z.string().optional(),
    avatar: z.string().optional(),
  }),
});

export { createAccountSchema, updateAccountSchema };
