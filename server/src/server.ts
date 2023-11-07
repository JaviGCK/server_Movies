import express, { Express, Request, Response } from "express";
import { genresRoutes, moviesRoutes, usersRoutes } from './routes';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { checkJwt } from './middleware/checkjwt.middleware';
import config from "./config/config";

const app: Express = express();
const corsOptions = {
    origin: config.app.ORIGIN
}

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
}));
app.use(express.json());


app.use('/users', checkJwt, usersRoutes);
app.use('/movies', checkJwt, moviesRoutes);
app.use('/genres', checkJwt, genresRoutes);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "Welcome to the API World" });
});
app.get("/hi", (req: Request, res: Response) => {
    res.status(200).json({ message: "HI" })
})

app.use(errorHandler)


export default app;
