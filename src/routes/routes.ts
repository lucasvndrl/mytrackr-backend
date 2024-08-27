import express from "express";
import accountRouter from "./accountRouter.routes";
import moviesRouter from "./moviesRouter.routes";
import reviewsRouter from "./reviewsRouter.routes";

const router = express.Router();

router.use("/account", accountRouter);
router.use("/movies", moviesRouter);
router.use("/reviews", reviewsRouter);

export default router;
