import express from "express";

import {
	addNoteController,
	getNoteController,
	removeNoteController,
	updateNoteController,
} from "../controllers/notesController";

import { notesValidationRules } from "../utils";

import { handleValidationErrors } from "../middlewares/payloadValidationMiddleware";
import { authGuard } from "../middlewares/authMiddleware";

const router = express.Router();

router.post(
	"/",
	notesValidationRules,
	handleValidationErrors,
	addNoteController
);
router.patch(
	"/",
	notesValidationRules,
	handleValidationErrors,
	updateNoteController
);
router.delete("/:noteId", removeNoteController);
router.get("/", authGuard, getNoteController);

export default router;
