import express from "express";
import { deleteFilesFs, getAllFilesFromFs } from "../../controllers/filesystemControllers";
import { auth } from "../../middlewares/authMiddlewares";


const fileRouter = express();


fileRouter.get("/all", auth, getAllFilesFromFs);
fileRouter.delete("/", auth, deleteFilesFs);


export default fileRouter;