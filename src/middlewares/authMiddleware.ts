import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

import User from "../models/user";

export const authGuard = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.headers.authorization?.split(" ")[1];

	if (!token)
		return res.status(403).send({
			errorMessage: "No token provided",
		});

	let decodedPayload: jwt.JwtPayload | string | null = null;

	try {
		decodedPayload = jwt.verify(token, "SIGN_WEB_TOKEN");
	} catch (error) {
		console.error(error);
		return res.status(401).send({
			errorMessage: "Invalid auth token!",
		});
	}

	if (typeof decodedPayload === "string")
		return res.status(401).send({
			errorMessage: "Invalid auth token!",
		});

	const email: string = decodedPayload["email"];
	const user = await User.findOne({ email });

	if (!user)
		return res.status(401).send({
			errorMessage: "Unauthorized",
		});

	req.body.userId = user.id.toString();
	next();
};
