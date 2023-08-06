import {Request, Response} from "express";
import Item from "../models/item";


export async function index(req: Request, res: Response): Promise<Response> {
	try {
		const menuItems = await Item.find({});
		return res.status(200).json(menuItems);
	} catch (err) {
		return res.status(400).json({error: err});
	}
}

export async function show(req: Request, res: Response): Promise<Response> {
	const id: string = req.params.itemId;
	try {
		const menuItem = await Item.findById(id);
		return res.status(200).json(menuItem);
	} catch (err) {
		return res.status(400).json({error: err});
	}
}

export async function create(req: Request, res: Response): Promise<Response> {
	try {
		const item = await Item.create(req.body);
		return res.status(201).json(item);
	} catch (err) {
		return res.status(400).json({error: err});
	}
}

export async function edit(req: Request, res: Response): Promise<Response> {
	const id: string = req.params.itemId;
	try {
		const menuItem = await Item.findByIdAndUpdate(id, req.body);
		return res.status(202).json(menuItem);
	} catch (err) {
		return res.status(400).json({error: err});
	}
}

export async function deleteItem(req: Request, res: Response): Promise<Response> {
	const id: string = req.params.itemId;
	try {
		const response = await Item.findByIdAndDelete(id);
		return res.status(204).json(response);
	} catch (err) {
		return res.status(400).json({error: err});
	}
}
