import { Request, Response } from "express";
import { db } from "../database";
import axios from "axios";

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export const getPopularMoviesList = async (
  req: Request,
  res: Response
): Promise<Response<MoviesResponse>> => {
  let responseMovies = {} as Promise<Response<MoviesResponse>>;
  await axios
    .get(process.env.TMBD_API_URL + "movie/popular?language=en-US&page=2", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
      },
    })
    .then((response) => {
      const movies = response.data;

      movies?.results?.map((movie: Movie) => {
        const posterPath = movie.poster_path;
        movie.poster_path = process.env.TMBD_IMAGE_API_URL + posterPath;
      });

      responseMovies = movies;
    });

  return res.status(200).json(responseMovies);
};
