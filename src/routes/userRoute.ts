import express from "express";

import {
	getUserController,
	removeUserController,
	updateUserController,
} from "../controllers/userController";

import { userValidationRules } from "../utils";
import { handleValidationErrors } from "../middlewares/payloadValidationMiddleware";
import { authGuard } from "../middlewares/authMiddleware";

const router = express.Router();

router.patch(
	"/:id",
	authGuard,
	userValidationRules,
	handleValidationErrors,
	updateUserController
);
router.delete("/:id", authGuard, removeUserController);
router.get("/:id", authGuard, getUserController);

export default router;
