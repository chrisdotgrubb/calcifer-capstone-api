import {Request, Response} from "express";
import Order from "../models/order";
import OrderItem from "../models/orderItem";
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
		const order = await Order.findById(id).populate("orderItems");
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
	const cartItems: { item: IItem, qty: number }[] = req.body.cartItems;
	const user: IUser = req.body.user;
	const isDelivery = req.body.isDelivery;
	const isPaid = false;
	const price = cartItems.reduce(((acc: number, cartItem) => acc + (cartItem.item.price * cartItem.qty)), 0);
	
	try {
		const order = await Order.create({user, isDelivery, isPaid, price});
		const orderItems = [];
		for (const cartItem of cartItems) {
			const completedOrderItem = await OrderItem.create({
				name: cartItem.item.name,
				price: cartItem.item.price,
				qty: cartItem.qty,
				img: cartItem.item.img,
				order: order._id
			});
			orderItems.push(completedOrderItem);
		}
		order.orderItems = orderItems.map(item => item._id);
		await order.save();
		
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
