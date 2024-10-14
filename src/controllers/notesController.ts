import { Request, Response } from "express";

import Notes, { INotes } from "@/models/notes";

class NoteController {
	async addNoteController(
		req: Request<{}, {}, { user: { id: string; email: string }; note: INotes }>,
		res: Response
	) {
		try {
			const userId = req.body.user.id;
			const newNote = new Notes({
				...req.body,
				userId,
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

	async getNoteController(
		req: Request<{}, {}, { user: { id: string; email: string } }>,
		res: Response
	) {
		const { user } = req.body;
		try {
			const notes = await Notes.find({ userId: user.id });
			const noteCount = notes.length;

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

	async updateNoteController(
		req: Request<
			{},
			{},
			{ user: { id: string; email: string }; note: INotes },
			{ noteId: string }
		>,
		res: Response
	) {
		const noteId = req.query.noteId;
		const updatedNote = req.body.note;
		try {
			const updatedNoteDocument = await Notes.findByIdAndUpdate(noteId, {
				note: {
					title: updatedNote.note.title,
					description: updatedNote.note.description,
				},
				status: updatedNote.status,
			});

			if (!updatedNoteDocument)
				return res.status(404).send({
					errorMessage: `No note found again this ${req.query.noteId} id`,
				});

			return res.status(201).send({
				message: `Note updated successfully!`,
				note: updatedNoteDocument,
			});
		} catch (error) {
			console.error(error);
			return res.status(500).send({
				errorMessage: "Oops! something went wrong.",
			});
		}
	}

	async updateNoteStatusController(
		req: Request<
			{ noteId: string },
			{},
			{ user: { id: string; email: string }; status: INotes }
		>,
		res: Response
	) {}

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

	async removeAllNotesController(
		req: Request<{}, {}, { user: { id: string; email: string } }>,
		res: Response
	) {
		const userId = req.body.user.id;

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
