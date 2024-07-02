import express from "express";

import {
	addNoteController,
	getNoteController,
	removeAllNotesController,
	removeNoteByIdController,
	updateNoteController,
} from "../controllers/notesController";

import { notesValidationRules } from "../utils";

import { handleValidationErrors } from "../middlewares/payloadValidationMiddleware";
import { authGuard } from "../middlewares/authMiddleware";

const router = express.Router();

router.post(
	"/",
	authGuard,
	notesValidationRules,
	handleValidationErrors,
	addNoteController
);
router.patch(
	"/",
	authGuard,
	notesValidationRules,
	handleValidationErrors,
	updateNoteController
);
router.delete("/:noteId", authGuard, removeNoteByIdController);
router.delete("/", authGuard, removeAllNotesController);
router.get("/", authGuard, getNoteController);

export default router;
