import { JWTPayload } from "express-oauth2-jwt-bearer";
import { UpdateAccountUseCase } from "./UpdateAccountUseCase";
import { Request, Response } from "express";
import { UpdateAccountDTO } from "./UpdateAccountDTO";

export class UpdateAccountController {
  constructor(private updateAccountUseCase: UpdateAccountUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const auth = request.auth;
    const payload = auth?.payload as JWTPayload;

    const account = request.body as UpdateAccountDTO;

    try {
      await this.updateAccountUseCase.execute(account);

      return response.status(200).send();
    } catch (error: any) {
      console.log(error);
      return response.status(400).json({
        message: error.message || "Unexpected error.",
      });
    }
  }
}
