import {Request, Response} from "express";
import Order from "../models/order";
import OrderItem, {IOrderItem} from "../models/orderItem";
import {IItem} from "../models/item";
import {IUser} from "../models/user";


export async function index(req: Request, res: Response): Promise<Response> {
	try {
		const orders = await Order.find({});
		return res.status(200).json(orders);
	} catch (err) {
		return res.status(400).json({error: err});
	}
}

export async function show(req: Request, res: Response): Promise<Response> {
	const id: string = req.params.orderId;
	try {
		const order = await Order.findById(id);
		if (!order) return res.status(404).json({error: "Order not found"});
		const orderItems = await OrderItem.find({order: order._id});
		
		const data = {
			order,
			orderItems,
		};
		return res.status(200).json(data);
	} catch (err) {
		return res.status(400).json({error: err});
	}
}

export async function create(req: Request, res: Response): Promise<Response> {
	const items: IItem[] = req.body.cartItems;
	const user: IUser = req.body.user;
	const isDelivery = req.body.isDelivery;
	const isPaid = false;
	const price = items.reduce(((acc: number, item) => acc + item.price), 0);
	
	try {
		const order = await Order.create({user, isDelivery, isPaid, price});
		const orderItems = [];
		for (const item of items) {
			const completedOrderItem = await OrderItem.create({
				name: item.name,
				price: item.price,
				img: item.img,
				order: order._id
			});
			orderItems.push(completedOrderItem);
		}
		
		const data = {
			order,
			orderItems,
		};
		
		return res.status(201).json(data);
	} catch (err) {
		return res.status(400).json({error: err});
	}
}

export async function edit(req: Request, res: Response): Promise<Response> {
	const id: string = req.params.orderId;
	try {
		const order = await Order.findByIdAndUpdate(id, req.body);
		return res.status(202).json(order);
	} catch (err) {
		return res.status(400).json({error: err});
	}
}

export async function deleteOrder(req: Request, res: Response): Promise<Response> {
	const id: string = req.params.orderId;
	try {
		const response = await Order.findByIdAndDelete(id);
		return res.status(204).json(response);
	} catch (err) {
		return res.status(400).json({error: err});
	}
}
