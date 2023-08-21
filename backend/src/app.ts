import express, {Request, Response, NextFunction, Application, ErrorRequestHandler } from "express";
import { Server } from "http";

import createHttpError from "http-errors";
import { config } from "dotenv";
import router from "./routes/api";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";

config();

const app: Application = express();


app.use(cors());

app.use(express.json());

const db2 = "mongodb://localhost:27017/docsapp";

if(process.env.dbInstance === "MongoDB") {
    if(process.env.DB !== undefined) {
        const db: string = process.env.DB;

        mongoose
            .connect(db2)
            .then(() => {console.log("MongoDB Connected")});

    }
}


app.use('/api', router);


if( process.env.NODE_ENV === "production" ) {
    app.use("/assets", express.static(path.join(__dirname, '../../frontend/dist/assets')));

    app.get("*", (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
    })
}
else {
    app.get("/", (req: Request, res: Response) => {
        res.json({msg: "Please Set To Production"});
    })
}


app.use((req: Request, res: Response, next: NextFunction) => {
    next(new createHttpError.NotFound());
})

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500);
    res.json({
        status: err.status || 500,
        message: err.message
    });
}

app.use(errorHandler);

const PORT: Number = Number(process.env.PORT) || 4000;

const server: Server = app.listen(PORT, () => {
    console.log("Server running in port", PORT);
})