import { ErrorRequestHandler, Request, Response, response } from "express";
import { db } from "../database";
import { JWTPayload } from "express-oauth2-jwt-bearer";
import axios from "axios";
import { AccountTable } from "../types";
import { redisClient } from "..";

export const saveAccount = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {
    username,
    email,
    created_at,
    last_login,
    user_id,
    avatar,
    favorites_genres,
  } = req.body;
  const auth = req.auth;
  try {
    await db.transaction().execute(async (trx) => {
      await trx
        .insertInto("account")
        .values({
          user_id: user_id,
          username: username,
          email: email,
          created_at: created_at,
          last_login: last_login,
          avatar: avatar,
          favorites_genres: favorites_genres,
        })
        .execute();
    });
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return res
      .status(500)
      .json({ message: "Cannot save account. Try again later." });
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

export const getAccountDetails = async (
  req: Request,
  res: Response
): Promise<Response> => {
  getClientCredentials();
  const auth = req.auth;
  const payload = auth?.payload as JWTPayload;
  const account = await db
    .selectFrom("account")
    .selectAll()
    .where("user_id", "=", `${payload.sub}`)
    .execute();

  if (account) {
    return res.status(200).json({ account: account });
  }
  return res.status(404).json({ message: "Account not found" });
};

export const updateAccountDetails = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const auth = req.auth;
  const payload = auth?.payload as JWTPayload;

  // Extract fields from request body that you want to update
  console.log(req.body);
  const account = req.body as AccountTable;

  try {
    // Update account details in the database
    const updatedAccount = await db
      .updateTable("account")
      .set({
        email: account.email,
        username: account.username,
        avatar: account.avatar,
        favorites_genres: account.favorites_genres,
      })
      .where("user_id", "=", `${payload.sub}`)
      .execute();

    if (updatedAccount[0].numChangedRows !== undefined) {
      return res.status(200).json({ message: "Account updated." });
    } else {
      return res
        .status(404)
        .json({ message: "Account not found or no changes made" });
    }
  } catch (error) {
    console.error("Update Account Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteAccount = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const auth = req.auth;
  const payload = auth?.payload as JWTPayload;

  try {
    const clientGrantToken = await getClientCredentials();

    await db.transaction().execute(async (trx) => {
      const response = await fetch(
        process.env.AUTH0_AUDIENCE + `users/${payload.sub}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${clientGrantToken}`,
          },
        }
      );
      if (response.status === 204) {
        await trx
          .deleteFrom("account")
          .where("user_id", "=", `${payload.sub}`)
          .execute();
      }
    });

    return res.status(200).json({ message: "Account deleted." });
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return res
      .status(500)
      .json({ message: "Account deletion failed! Try again later." });
  }
};

const getClientCredentials = async () => {
  const cachedToken = await redisClient.get("clientCredentialsToken");
  if (cachedToken) {
    console.log("Token retrieved from Redis");
    return cachedToken;
  }

  const response = await axios.post(
    process.env.AUTH0_ISSUER_BASE_URL + "oauth/token",
    {
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: process.env.AUTH0_AUDIENCE,
      grant_type: "client_credentials",
    }
  );

  const accessToken = response.data.access_token;
  if (accessToken) {
    await redisClient.set("clientCredentialsToken", accessToken, {
      EX: 86400,
    });
    console.log("Token saved to Redis");
  }

  return accessToken;
};
