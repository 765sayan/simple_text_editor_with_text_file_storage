import express, { Router } from "express";
import indexRouter from "./v1";

const router: Router = express.Router();

router.use("/v1", indexRouter);

export default router;
