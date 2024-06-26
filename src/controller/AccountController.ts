import axios from "axios";
import { Request, Response } from "express";
import { JWTPayload } from "express-oauth2-jwt-bearer";
import * as jwt from "jose";
import { redisClient } from "..";
import { db } from "../database";
export const saveAccount = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { account } = req.body;
  try {
    await db.transaction().execute(async (trx) => {
      await trx
        .insertInto("account")
        .values({
          user_id: account.user_id,
          username: account.username,
          email: account.email,
          created_at: account.created_at,
          last_login: account.last_login,
          favorite_genres: account.favorite_genres,
          avatar: account.avatar,
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
  const auth = req.auth;
  const payload = auth?.payload as JWTPayload;
  try {
    const account = await db
      .selectFrom("account")
      .selectAll()
      .where("user_id", "=", `${payload.sub}`)
      .executeTakeFirst();

    if (account) {
      return res
        .status(200)
        .json({ account: { ...account, avatar: account.avatar?.toString() } });
    } else {
      return res.status(404).json({ message: "Account not found" });
    }
  } catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateAccountDetails = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const auth = req.auth;
  const payload = auth?.payload as JWTPayload;

  const { account } = req.body;

  try {
    const updatedAccount = await db
      .updateTable("account")
      .set({
        email: account.email,
        username: account.username,
        avatar: account.avatar,
      })
      .where("user_id", "=", `${payload.sub}`)
      .executeTakeFirst();

    if (updatedAccount.numUpdatedRows) {
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
  const key = jwt.EmbeddedJWK;
  const cachedToken = await redisClient.get("clientCredentialsToken");
  if (cachedToken) {
    const now = Math.floor(Date.now() / 1000);
    const payload = jwt.decodeJwt(cachedToken);
    if (payload.exp && payload.exp > now) {
      return cachedToken;
    }
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
