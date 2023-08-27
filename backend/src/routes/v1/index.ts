import express, { Router } from "express";
import documentRouter from "./documentRoutes";
import fileRouter from "./filesystemRoutes";
import authRouter from "./authRoutes";

const indexRouter: Router = express.Router();

indexRouter.use("/document", documentRouter);
indexRouter.use("/fs", fileRouter);
indexRouter.use("/auth", authRouter);

export default indexRouter;
