import express from "express";
import { deleteFilesFs, getAllFilesFromFs, getSharedFileWithUserController } from "../../controllers/filesystemControllers";
import { auth } from "../../middlewares/authMiddlewares";


const fileRouter = express();


fileRouter.get("/all", auth, getAllFilesFromFs);
fileRouter.delete("/", auth, deleteFilesFs);



fileRouter.get("/shared", auth, getSharedFileWithUserController);


export default fileRouter;