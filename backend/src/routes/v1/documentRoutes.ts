import express from "express";
import { createFileController, downloadFileController, readFileController, removeFileController, updateFileController } from "../../controllers/documentControllers";
import { auth } from "../../middlewares/authMiddlewares";

const documentRouter = express.Router();



documentRouter.get('/file/download', downloadFileController);





documentRouter.post('/file', auth, createFileController);



documentRouter.delete('/file', auth, removeFileController);

documentRouter.put('/file', auth, updateFileController);

documentRouter.get('/file/read', auth, readFileController);

export default documentRouter;