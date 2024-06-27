import express from "express";

import {
	addNoteController,
	getNoteController,
	removeNoteController,
	updateNoteController,
} from "../controllers/notesController";

import { notesValidationRules } from "../utils";

import { handleValidationErrors } from "../middlewares/payloadValidationMiddleware";

const router = express.Router();

router.post(
	"/note",
	notesValidationRules,
	handleValidationErrors,
	addNoteController
);
router.patch(
	"/note",
	notesValidationRules,
	handleValidationErrors,
	updateNoteController
);
router.delete("/note/:noteId", removeNoteController);
router.get("/notes/:userId", getNoteController);

export default router;
