import { Request, Response } from "express";
import { GetAllMoviesUseCase } from "./GetAllMoviesUseCase";

export class GetAllMoviesController {
  constructor(private getAllMoviesUseCase: GetAllMoviesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const movies = await this.getAllMoviesUseCase.execute();

      return response.status(200).json(movies);
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || "Unexpected error.",
      });
    }
  }
}
