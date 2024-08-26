import { Request, Response } from "express";
import { GetAccountDetailsUseCase } from "./GetAccountDetailsUseCase";
import { JWTPayload } from "express-oauth2-jwt-bearer";

export class GetAccountDetailsController {
  constructor(private getAccountDetailsUseCase: GetAccountDetailsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const auth = request.auth;
    const payload = auth?.payload as JWTPayload;

    try {
      if (payload.sub === undefined) {
        return response.status(400).json({
          message: "Invalid token.",
        });
      }

      const account = await this.getAccountDetailsUseCase.execute(payload.sub);

      return response.status(200).json(account);
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || "Unexpected error.",
      });
    }
  }
}
