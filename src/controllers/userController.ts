import { Request, Response } from "express";

import User from "../models/user";

// const addUserController = async (req: Request, res: Response) => {
// 	try {
// 		const newUser = new User({
// 			...req.body,
// 		});
// 		const savedUser = await newUser.save();
// 		return res
// 			.status(201)
// 			.send({ message: `User registered successfully ${savedUser.id}` });
// 	} catch (error) {
// 		console.error(error);
// 		return res.status(500).send({
// 			errorMessage: "Oops! something went wrong.",
// 		});
// 	}
// };

const getUserController = async (req: Request, res: Response) => {
	try {
		const users = await User.find();
		if (!users.length)
			return res
				.status(404)
				.send({ errorMessage: "No Users found in the database" });
		return res.status(200).send({ users });
	} catch (error) {
		console.error(error);
		return res.status(500).send({
			errorMessage: "Oops! something went wrong.",
		});
	}
};

const updateUserController = async (req: Request, res: Response) => {
	const userId = req.params.id || null;

	if (!userId)
		return res.status(400).send({
			errorMessage: 'User cannot be fetched without "userId"!',
		});
	try {
		const updatedUser = await User.findByIdAndUpdate(userId, req.body);
		if (!updatedUser)
			return res.status(404).send({
				errorMessage: `No user found again this ${userId} id`,
			});
		return res
			.status(201)
			.send({ message: `Note updated successfully! ${updatedUser.id}` });
	} catch (error) {
		console.error(error);
		return res.status(500).send({
			errorMessage: "Oops! something went wrong.",
		});
	}
};

const removeUserController = async (req: Request, res: Response) => {
	const userId = req.params.userId || null;

	if (!userId)
		return res.status(404).send({
			errorMessage: `No user found again this ${userId} id`,
		});

	try {
		const deletedUser = await User.findByIdAndDelete(userId);
		return res.status(200).send({
			message: `Note deleted successfully ${deletedUser?.id}`,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send({
			errorMessage: "Oops! something went wrong.",
		});
	}
};

export {
	// addUserController,
	getUserController,
	updateUserController,
	removeUserController,
};
