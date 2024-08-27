import { Request, Response } from "express";
import { CreateAccountUseCase } from "./CreateAccountUseCase";

export class CreateAccountController {
  constructor(private createAccountUseCase: CreateAccountUseCase) {}
  async handle(request: Request, response: Response) {
    const account = request.body;

    try {
      console.log(account);
      await this.createAccountUseCase.execute({
        user_id: account.user_id,
        username: account.username,
        email: account.email,
        created_at: account.created_at,
        last_login: account.last_login,
        favorite_genres: account.favorite_genres,
        avatar: account.avatar,
      });
      return response.status(201).send();
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || "Unexpected error.",
      });
    }
  }
}
