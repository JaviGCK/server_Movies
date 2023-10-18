import express, { Express, Request, Response } from "express"
import { genresRoutes, moviesRoutes, usersRoutes } from './routes';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import fileUpload from 'express-fileupload'
import { checkJwt } from './middleware/checkjwt.middleware';

const app: Express = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
}));


app.use(express.json());
app.use('/users', usersRoutes);
app.use('/movies', moviesRoutes);
app.use('/genres', genresRoutes);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "Welcome to the API World" })
})
export default app