import express from "express";
import authRouter from "./auth/auth.route.js";
import userRouter from "./user/user.route.js";
import morgan from 'morgan';

const app = express();
app.use(morgan('dev'));

app.use(express.json());

app.use("/api/v2/auth", authRouter);
app.use("/api/v2/users", userRouter);

export default app;