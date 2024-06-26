import express, { Request, Response } from "express";

import User from "../models/user";
import Notes from "../models/notes";

const router = express.Router();

router.post("/note", async (req: Request, res: Response) => {
	if (!req.body?.note?.userId) {
		return res.status(400).send({
			errorMessage: 'Notes cannot be fetched with "userId"!',
		});
	}

	try {
		const user = await User.findById(req.body.userId);
		if (!user) {
			return res.status(404).send({
				errorMessage: `No user found again this ${req.body.note.userId} id`,
			});
		}

		const newNote = new Notes({
			...req.body.note,
		});

		const savedNote = await newNote.save();

		return res
			.status(201)
			.send({ message: `Note created successfully! ${savedNote.id}` });
	} catch (error) {
		console.error(error);
		res.status(500).send({
			errorMessage: "Oops! something went wrong.",
		});
	}
});

router.get("/notes", async (req: Request, res: Response) => {});
