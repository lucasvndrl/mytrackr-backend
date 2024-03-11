import { ErrorRequestHandler, Request, Response } from "express";
import { db } from "../database";

export const saveLoggedUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { username, email, created_at, last_login } = req.body;

  try {
    db.insertInto("account")
      .values({
        username: username,
        email: email,
        created_at: created_at,
        last_login: last_login,
      })
      .execute();
  } catch (error) {
    return res.status(500).json(error);
  }

  return res.status(200).json({ message: "Account saved successfully" });
};

export const getAllAccounts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const accounts = await db.selectFrom("account").selectAll().execute();

  return res.status(200).json({ accounts: accounts });
};
