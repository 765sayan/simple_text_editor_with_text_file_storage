import express from "express";
import { createFileController, downloadFileController, readFileController, updateFileController } from "../../controllers/documentControllers";
import { auth } from "../../middlewares/authMiddlewares";

const documentRouter = express.Router();



documentRouter.get('/file/download', auth, downloadFileController);





documentRouter.post('/file', auth, createFileController);

documentRouter.put('/file', auth, updateFileController);

documentRouter.get('/file/read', auth, readFileController);

export default documentRouter;