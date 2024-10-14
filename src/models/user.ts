import mongoose, { Schema } from "mongoose";

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
}

const SALT_ROUND = 10;

const UserSchema: Schema = new mongoose.Schema<IUser>(
	{
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
	},
	{
		timestamps: true,
		toJSON: {
			transform: function (doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.__v;
				return ret;
			},
		},
	}
);

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
