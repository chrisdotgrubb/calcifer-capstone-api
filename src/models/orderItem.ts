import mongoose from "mongoose";
import {IOrder} from "./order";

export interface IOrderItem {
	name: string;
	price: number;
	qty: number;
	img: string;
	order: IOrder;
}

const orderItemSchema = new mongoose.Schema({
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
			min: 0,
		},
		qty: {
			type: Number,
			required: true,
			min: 1,
		},
		img: {
			type: String,
			required: true,
		},
		order: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Order",
		},
	}, {timestamps: true},
);

const OrderItem = mongoose.model("OrderItem", orderItemSchema);
export default OrderItem;
