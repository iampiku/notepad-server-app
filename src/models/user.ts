import mongoose, { Schema } from "mongoose";

import { genSalt, hash } from "bcryptjs";

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

UserSchema.pre("save", async function (next) {
	if (this.isModified("password")) return next();

	const salt = await genSalt(SALT_ROUND);
	this.password = await hash(this.password, salt);

	next();
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
