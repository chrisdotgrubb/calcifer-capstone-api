import {Schema, model} from "mongoose";

export interface IUser {
	username: string,
	password: string,
	role: string,
	isActive: boolean,
}

const userSchema = new Schema<IUser>({
	username: {
		type: String,
		required: [true, "Username is required"],
	},
	password: {
		type: String,
		required: [true, "Password is required"],
	},
	role: {
		type: String,
		enum: ["user", "manager", "admin"],
		default: "user",
	},
	isActive: {
		type: Boolean,
		default: true,
	},
}, {timestamps: true});

const User = model("User", userSchema);
export default User;