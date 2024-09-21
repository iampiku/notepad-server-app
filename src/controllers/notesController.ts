import { Request, Response } from "express";

import User from "@/models/user";
import Notes from "@/models/notes";

class NoteController {
	async addNoteController(req: Request, res: Response) {
		try {
			const newNote = new Notes({
				...req.body,
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
	}

	async getNoteController(req: Request, res: Response) {
		const userId: string | null = req.body.userId || null;

		if (!userId) {
			return res.status(400).send({
				errorMessage: 'Notes cannot be fetched without "userId"!',
			});
		}

		try {
			const user = await User.findById(userId);
			if (!user) {
				return res.status(404).send({
					errorMessage: `No user found again this ${userId} id!`,
				});
			}

			const notes = await Notes.find({ userId });
			const noteCount = await Notes.countDocuments({ userId });

			if (!noteCount)
				return res.status(404).send({
					message: "No notes found!",
				});

			return res.status(200).send({
				notes,
				count: noteCount,
			});
		} catch (error) {
			console.error(error);
			return res.status(500).send({
				errorMessage: "Oops! something went wrong.",
			});
		}
	}

	async updateNoteController(req: Request, res: Response) {
		try {
			const user = await User.findById(req.body.userId);
			if (!user) {
				return res.status(404).send({
					errorMessage: `No user found again this ${req.body.note.userId} id`,
				});
			}

			const updatedNote = await Notes.findByIdAndUpdate(req.body.id, req.body);

			if (!updatedNote)
				return res.status(404).send({
					errorMessage: `No note found again this ${req.body.id} id`,
				});

			return res
				.status(201)
				.send({ message: `Note updated successfully! ${updatedNote.id}` });
		} catch (error) {
			console.error(error);
			return res.status(500).send({
				errorMessage: "Oops! something went wrong.",
			});
		}
	}

	async removeNoteByIdController(req: Request, res: Response) {
		const noteId = req.params.noteId || null;

		if (!noteId)
			return res.status(401).send({
				errorMessage: `Note id is missing`,
			});

		try {
			const deletedNote = await Notes.findByIdAndDelete(noteId);
			return res.status(200).send({
				message: `Note deleted successfully ${deletedNote?.id}`,
			});
		} catch (error) {
			console.error(error);
			return res.status(500).send({
				errorMessage: "Oops! something went wrong.",
			});
		}
	}

	async removeAllNotesController(req: Request, res: Response) {
		const userId = req.params.userId || null;

		if (!userId)
			return res.status(401).send({
				errorMessage: `User id is missing`,
			});

		try {
			const isNotePresent = await Notes.findOne({ userId });
			if (!isNotePresent)
				return res.status(404).send({
					errorMessage: `No notes found`,
				});
			const deletedNotes = await Notes.deleteMany({ userId });

			return res.status(200).send({
				errorMessage: `${deletedNotes.deletedCount} notes deleted.`,
			});
		} catch (error) {
			console.error(error);
			return res.status(500).send({
				errorMessage: "Oops! something went wrong.",
			});
		}
	}
}

const noteController = new NoteController();
export default noteController;
