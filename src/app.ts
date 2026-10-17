import express from "express";
import authRouter from "./auth/auth.route.js";

const app = express();

app.use(express.json());

app.use("/api/v2/auth", authRouter);

export default app;