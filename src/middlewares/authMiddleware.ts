import { Request, Response } from "express";

import jwt from "jsonwebtoken";

import User from "../models/user";

export const authGuard = async (
	req: Request,
	res: Response,
	next: Function
) => {
	let token = null;
	if (req.headers.authorization?.startsWith("Bearer")) {
		try {
			token = req.headers.authorization.split(" ")[1];
			const decodedToken = jwt.verify(token, "SIGN_WEB_TOKEN");
			req.user = await User.findById(decodedToken.id).select;
		} catch (error) {
			res.status(401).send({ message: "Not authorized, token failed" });
		}
	}
	if (!token)
		return res.status(401).send({ message: "Not authorized, no token" });
};
