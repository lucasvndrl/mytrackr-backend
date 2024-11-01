import { NextFunction, Request, Response } from "express";
import { AccountTable } from "../types";

export const accountTest: AccountTable = {
  user_id: "1",
  username: "testUser",
  email: "test@example.com",
  created_at: new Date(),
  last_login: new Date(),
  favorite_genres: ["Comedy", "Drama"],
  avatar: new Blob(),
};

export const authTestToken = (
  req?: Request,
  res?: Response,
  next?: NextFunction
) => {
  req!!.auth = {
    header: {},
    token: "",
    payload: {
      sub: "unique_user_id",
    },
  };

  return next!!();
};
