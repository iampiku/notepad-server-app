import { Request, Response } from "express";

import User from "../models/user";
import Notes from "../models/notes";

const addNoteController = async (req: Request, res: Response) => {
	if (!req.body?.note?.userId) {
		return res.status(400).send({
			errorMessage: 'Notes cannot be created with "userId"!',
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
		return res.status(500).send({
			errorMessage: "Oops! something went wrong.",
		});
	}
};

const getNotesController = async (req: Request, res: Response) => {
	const userId = req.params.userId || null;

	if (!userId) {
		return res.status(400).send({
			errorMessage: 'Notes cannot be fetched with "userId"!',
		});
	}

	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).send({
				errorMessage: `No user found again this ${userId} id`,
			});
		}
	} catch (error) {
		console.error(error);
		return res.status(500).send({
			errorMessage: "Oops! something went wrong.",
		});
	}
};

const updateNoteController = async (req: Request, res: Response) => {
	const userId = null;
	if (!userId) {
		return res.status(400).send({
			errorMessage: 'Notes cannot be fetched with "userId"!',
		});
	}
};

const removeNoteController = async (req: Request, res: Response) => {};

export {
	addNoteController,
	getNotesController,
	updateNoteController,
	removeNoteController,
};
