import { JWTPayload } from "express-oauth2-jwt-bearer";
import { DeleteAccountUseCase } from "./DeleteAccountUseCase";
import { Request, Response } from "express";
import * as jwt from "jose";
import { redisClient } from "../..";
import axios from "axios";

export class DeleteAccountController {
  constructor(private deleteAccountUseCase: DeleteAccountUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const auth = request.auth;
    const payload = auth?.payload as JWTPayload;

    try {
      const clientGrantToken = await this.getClientCredentials();

      const isAccountDeletedAuth0 = await this.deleteAccountFromAuth0(
        payload.sub ? payload.sub : "",
        clientGrantToken
      );

      if (isAccountDeletedAuth0) {
        await this.deleteAccountUseCase.execute(payload.sub ? payload.sub : "");
      } else {
        return response.status(500).json({
          message: "Cannot delete account from Auth0. Try again later.",
        });
      }

      return response.status(200).send();
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || "Unexpected error.",
      });
    }
  }

  private deleteAccountFromAuth0 = async (
    userId: string,
    token: string
  ): Promise<boolean> => {
    try {
      const response = await fetch(
        process.env.AUTH0_AUDIENCE + `users/${userId.sub}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.status === 204;
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      return false;
    }
  };

  private getClientCredentials = async () => {
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
}
