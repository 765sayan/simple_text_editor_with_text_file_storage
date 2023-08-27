import express from "express";
import {
  createFileController,
  deleteSecondaryOwnersOfFileController,
  downloadFileController,
  getSecondaryOwnerOfAFileController,
  readFileController,
  shareFileController,
  updateFileController,
} from "../../controllers/documentControllers";
import { auth } from "../../middlewares/authMiddlewares";

const documentRouter = express.Router();

documentRouter.get("/file/download", auth, downloadFileController);

documentRouter.post("/file", auth, createFileController);

documentRouter.put("/file", auth, updateFileController);

documentRouter.get("/file/read", auth, readFileController);

documentRouter.post("/file/share", auth, shareFileController);

documentRouter.get("/file/share", auth, getSecondaryOwnerOfAFileController);

documentRouter.delete(
  "/file/share",
  auth,
  deleteSecondaryOwnersOfFileController
);

export default documentRouter;
