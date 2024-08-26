import express from "express";
import accountRouter from "./accountRouter.routes";

const router = express.Router();

router.use("/account", accountRouter);

export default router;
