import { Router } from "express";
import piuRouter from "./piu.routes";
import userRouter from './user.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/pius', piuRouter);

export default routes;