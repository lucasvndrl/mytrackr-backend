import express from "express";
import { getAllAccounts, saveLoggedUser } from "./controller/AccountController";

const router = express.Router();

router.post("/test", express.json(), (req, res) => {
  saveLoggedUser(req, res);
});
router.get("/list-all-accounts", getAllAccounts);

export default router;
