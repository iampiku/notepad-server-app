import mongoose, { Schema } from "mongoose";

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
}

const SALT_ROUND = 10;

const UserSchema: Schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
