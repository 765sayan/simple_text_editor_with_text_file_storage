import express, { Request, Response } from "express";
import { getUserInfoController, loginController, registerController } from "../../controllers/authControllers";
import { auth } from "../../middlewares/authMiddlewares";


const authRouter = express.Router();


authRouter.post("/login", loginController);

authRouter.post("/register", registerController);


authRouter.get("/user", auth, getUserInfoController);

export default authRouter;