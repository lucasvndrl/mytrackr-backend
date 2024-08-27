import { db } from "../database";
import { MoviesTable } from "../types";

export class MoviesRepository {
  private repo = db;

  async getMovies(): Promise<MoviesTable[]> {
    return await this.repo.selectFrom("movies").selectAll().execute();
  }

  async getMoveDetails(movieId: string): Promise<MoviesTable> {
    const movie = await this.repo
      .selectFrom("movies")
      .selectAll()
      .where("movie_id", "=", movieId)
      .executeTakeFirst();

    return movie as MoviesTable;
  }
}
