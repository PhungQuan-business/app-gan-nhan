import express from "express";
import authRouter from "./auth/auth.route.js";
import userRouter from "./user/user.route.js";


const app = express();

app.use(express.json());

app.use("/api/v2/auth", authRouter);
app.use("/api/v2/users", userRouter);

export default app;