import User from "../models/user";
import {Request, Response} from "express";
import {compare} from "bcrypt";
import {JwtPayload, sign, verify} from "jsonwebtoken";

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";

export async function login(req: Request, res: Response): Promise<Response> {
	const {username, password} = req.body;
	if (!username || !password) {
		return res.status(400).json({error: "Username and password required"});
	}
	try {
		const user = await User.findOne({username}).exec();
		if (!user || !user.isActive) {
			return res.status(400).json({error: "User not found"});
		}
		
		const isValid: boolean = await compare(password, user.password);
		if (!isValid) {
			return res.status(401).json({error: "Invalid username/password"});
		}
		
		const accessToken = sign(
			{
				"user": {
					"username": user.username,
					"role": user.role,
				}
			},
			ACCESS_TOKEN_SECRET,
			{expiresIn: "6h"},
		);
		
		const refreshToken = sign(
			{"username": user.username},
			REFRESH_TOKEN_SECRET,
			{expiresIn: "7d"}
		);
		
		res.cookie("jwt", refreshToken, {
			httpOnly: true,
			// secure: true,  // uncomment on deploy
			sameSite: "strict",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});
		
		return res.status(200).json({accessToken});
	} catch (err) {
		return res.status(400).json({error: err});
	}
}

export async function refresh(req: Request, res: Response) {
	const cookies = req.cookies;
	
	if (!cookies || !cookies.jwt) {
		return res.status(401).json({error: "Unauthorized"});
	}
	
	try {
		const decoded: JwtPayload | string = verify(cookies.jwt, REFRESH_TOKEN_SECRET,);
		if (typeof decoded === "string") return res.status(400).json({
			error: {
				name: "JsonWebTokenError",
				"message": "invalid signature"
			}
		});
		const user = await User.findOne({username: decoded.username});
		if (!user) return res.status(401).json({error: "Unauthorized"});
		const accessToken = sign(
			{
				"user": {
					"username": user.username,
					"role": user.role,
				}
			},
			ACCESS_TOKEN_SECRET,
			{expiresIn: "6h"},
		);
		
		res.status(200).json({accessToken});
	} catch (err) {
		return res.status(400).json({error: err});
	}
}

export function logout(req: Request, res: Response): Response {
	const cookies = req.cookies;
	if (!cookies || !cookies.jwt) {
		return res.status(200).json({message: "Logged out"});
	}
	res.clearCookie(
		"jwt",
		{
			httpOnly: true,
			// secure: true,  // uncomment on deploy
			sameSite: "strict",
		});
	return res.status(200).json({message: "Logged out"});
}