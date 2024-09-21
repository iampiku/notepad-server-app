import { Request, Response } from "express";

import User from "@/models/user";
import Notes from "@/models/notes";

class UserController {
	async getUserController(req: Request, res: Response) {
		const userId = req.params.id || null;
		try {
			const users = userId
				? await User.findOne({ id: userId })
				: await User.find();

			if (!users)
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
	}

	async updateUserController(req: Request, res: Response) {
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
	}

	async removeUserController(req: Request, res: Response) {
		const userId = req.params.userId || null;

		if (!userId)
			return res.status(404).send({
				errorMessage: `No user found again this ${userId} id`,
			});

		try {
			const [deletedNotes, deletedUser] = await Promise.all([
				Notes.deleteMany({ userId }),
				User.findByIdAndDelete(userId),
			]);

			return res.status(200).send({
				message: `User deleted successfully ${deletedUser?.id} with ${
					deletedNotes.deletedCount || 0
				} notes`,
			});
		} catch (error) {
			console.error(error);
			return res.status(500).send({
				errorMessage: "Oops! something went wrong.",
			});
		}
	}
}

const userController = new UserController();
export default userController;
