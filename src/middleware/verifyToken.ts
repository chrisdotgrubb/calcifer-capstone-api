import jwt from "jsonwebtoken";
import {NextFunction, Request, Response} from "express";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";

interface IRequestUser extends Request {
	user?: string;
	role?: string;
}

export default function verifyToken(req: IRequestUser, res: Response, next: NextFunction) {
	const authHeader: string | string[] | undefined = req.headers.Authorization || req.headers.authorization;
	
	if (!authHeader || typeof authHeader === "object" || !authHeader.startsWith("Bearer ")) {
		return res.status(401).json({error: "Unauthorized"});
	}
	const token = authHeader.split(" ")[1];
	
	jwt.verify(
		token,
		ACCESS_TOKEN_SECRET,
		(err, decoded) => {
			if (err || typeof decoded === "undefined" || typeof decoded === "string") return res.status(403).json({error: "Forbidden"});
			req.user = decoded.user.username;
			req.role = decoded.user.role;
			return next();
		}
	);
}