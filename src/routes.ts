import express from "express";
import {
  deleteAccount,
  getAccountDetails,
  getAllAccounts,
  saveAccount,
  updateAccountDetails,
} from "./controller/AccountController";
import { getPopularMoviesList } from "./controller/MovieController";
import { requiredScopes } from "express-oauth2-jwt-bearer";
import { jwtCheck } from ".";

const router = express.Router();

router.post("/account", express.json(), (req, res) => {
  saveAccount(req, res);
});
router.get("/account", getAccountDetails);
router.patch("/account", express.json(), updateAccountDetails);
router.delete("/account", deleteAccount);
router.get("/list-all-accounts", getAllAccounts);
router.get("/popular-movies-list", getPopularMoviesList);

export default router;
