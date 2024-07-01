import { body } from "express-validator";

import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const notesValidationRules = [
	body("note").notEmpty().withMessage("Notes is required."),
	body("userId")
		.notEmpty()
		.withMessage("User id cannot be empty")
		.isMongoId()
		.withMessage("Invalid user Id"),
	body("status")
		.isIn(["Todo", "Completed", "Inprogress", "Pending"])
		.withMessage("Invalid status value"),
];

export const userValidationRules = [
	body("name")
		.notEmpty()
		.withMessage("User name cannot be empty")
		.isAlpha()
		.withMessage("Invalid user name")
		.isLength({ min: 3 })
		.withMessage("User name is too short"),
	body("email")
		.notEmpty()
		.withMessage("User email cannot be empty")
		.isEmail()
		.withMessage("Invalid user email"),
	body("password").isLength({ min: 6 }).withMessage("Password is too short"),
];

export interface UserPayload {
	id: mongoose.Schema.Types.ObjectId;
	email: string;
}

export const generateToken = (user: UserPayload) => {
	return jwt.sign(user, "SIGN_WEB_TOKEN", {
		expiresIn: "30d",
	});
};

export const SALT_ROUND = 10;
