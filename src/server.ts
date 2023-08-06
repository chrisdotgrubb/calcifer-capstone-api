import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import "./config/database";
import apiRouter from "./routes/apiRouter";

dotenv.config();

const app = express();
const port: string | number = process.env.PORT || 3001;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


app.use("/api", apiRouter);

app.get("*", (req, res) => {
	res.status(404).json({error: "Route not found"});
});

app.listen(port, (): void => {
	console.log(`API running on port ${port}`);
});