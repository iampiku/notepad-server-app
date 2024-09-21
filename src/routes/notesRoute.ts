import express from "express";

import notesController from "@/controllers/notesController";

import { notesValidationRules } from "@/utils";

import { authGuard } from "@/middlewares/authMiddleware";
import { handleValidationErrors } from "@/middlewares/payloadValidationMiddleware";

const router = express.Router();

router.post(
	"/",
	authGuard,
	notesValidationRules,
	handleValidationErrors,
	notesController.addNoteController
);
router.patch(
	"/",
	authGuard,
	notesValidationRules,
	handleValidationErrors,
	notesController.updateNoteController
);
router.delete("/:noteId", authGuard, notesController.removeNoteByIdController);
router.delete("/", authGuard, notesController.removeAllNotesController);
router.get("/", authGuard, notesController.getNoteController);

export default router;
