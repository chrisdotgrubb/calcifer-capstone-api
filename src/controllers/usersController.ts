import User from "../models/user";
import {Request, Response} from "express";
import {hash} from "bcrypt";

const SALT_ROUNDS: number = 8;


export async function getAll(req: Request, res: Response): Promise<Response | void> {
	try {
		const users = await User.find().select("-password").lean();
		if (!users || users.length === 0) {
			return res.status(400).json({error: "No users found"});
		}
		const context = {
			users,
		};
		res.status(200).json(context);
	} catch (err) {
		res.status(400).json({error: err});
	}
}

export async function create(req: Request, res: Response): Promise<Response | void> {
	const {username, password} = req.body;
	if (!username || !password) {
		return res.status(400).json({error: "Username and password required"});
	}
	try {
		const usernameExists = await User.findOne({username}).lean().exec();
		if (usernameExists) {
			return res.status(400).json({error: "Username already exists"});
		}
		const hashed: string = await hash(password, SALT_ROUNDS);
		const user = await User.create({username, password: hashed, role: "user"});
		if (user) {
			res.status(201).json({message: `'${username}' created successfully`});
		} else {
			return res.status(400).json({error: "Creation failed"});
		}
	} catch (err) {
		res.status(400).json({error: err});
	}
}

export async function deleteUser(req: Request, res: Response): Promise<Response | void> {
	const {id} = req.body;
	if (!id) {
		return res.status(400).json({error: "id required"});
	}
	try {
		// should check for orders from this user if actually deleting
		const user = await User.findById(id).exec();
		if (!user) {
			return res.status(400).json({error: "User not found"});
		}
		user.isActive = false;
		await user.save();
		
		res.status(200).json({message: "Deactivated user account"});
	} catch (err) {
		res.status(400).json({error: err});
	}
}