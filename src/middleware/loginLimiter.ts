import rateLimit, {Options} from "express-rate-limit";
import {NextFunction, Request, Response} from "express";

const loginLimiter = rateLimit({
	max: 5,
	windowMs: 60 * 1000,
	standardHeaders: true,
	legacyHeaders: false,
	message: "Too many requests, please wait and try again",
	statusCode: 403,
	handler: (req: Request, res: Response, next: NextFunction, options: Options): void => {
		res.status(options.statusCode).json({error: options.message});
	}
});

export default loginLimiter;