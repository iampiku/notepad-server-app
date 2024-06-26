import express from "express";

import {
	addNoteController,
	getNotesController,
	removeNoteController,
	updateNoteController,
} from "../controllers/notesController";

const router = express.Router();

router.post("/note", addNoteController);
router.patch("/note", updateNoteController);
router.delete("/note", removeNoteController);
router.get("/notes/:userId", getNotesController);

export default router;
