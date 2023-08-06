import mongoose from "mongoose";
import {IUser} from "./user";
import {IOrderItem} from "./orderItem";

export interface IOrder {
	price: number,
	isDelivery: boolean,
	isPaid: boolean,
	user: IUser,
	orderItems: IOrderItem,
}

const orderSchema = new mongoose.Schema({
		price: {
			type: Number,
			required: true,
		},
		isDelivery: {
			type: Boolean,
			default: false,
		},
		isPaid: {
			type: Boolean,
			default: false,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		orderItems: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "OrderItem",
		}],
	}, {timestamps: true},
);

const Order = mongoose.model("Order", orderSchema);
export default Order;