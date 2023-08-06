import mongoose from "mongoose";

export interface IItem {
	name: string,
	description: string,
	price: number,
	img: string,
}

const itemSchema = new mongoose.Schema({
		name: {
			type: String,
			required: [true, "Title is required"],
		},
		description: {
			type: String,
			required: [true, "Description is required"],
		},
		price: {
			type: Number,
			required: [true, "Price is required"],
			min: 0,
		},
		img: {
			type: String,
			required: [true, "Image path is required"],
		},
	}, {timestamps: true},
);

const Item = mongoose.model("Item", itemSchema);
export default Item;