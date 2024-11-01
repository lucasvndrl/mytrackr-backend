import { Request, Response } from "express";
import { GetAccountDetailsUseCase } from "./GetAccountDetailsUseCase";
import { JWTPayload } from "express-oauth2-jwt-bearer";
import AppError from "../../../error/AppError";

export class GetAccountDetailsController {
  constructor(private getAccountDetailsUseCase: GetAccountDetailsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const auth = request.auth;
    const payload = auth?.payload as JWTPayload;
    try {
      if (!payload || !payload.sub) {
        throw new AppError("Invalid token.", 401);
      }
      const account = await this.getAccountDetailsUseCase.execute(payload.sub);

      return response.status(200).json(account);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({
          message: error.message,
        });
      }
      return response.status(500).json({ message: "Internal server error." });
    }
  }
}
