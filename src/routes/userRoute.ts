import express from "express";

import userController from "@/controllers/userController";

import { userValidationRules } from "@/utils";

import { authGuard } from "@/middlewares/authMiddleware";
import { handleValidationErrors } from "@/middlewares/payloadValidationMiddleware";

const router = express.Router();

router.patch(
	"/:id",
	authGuard,
	userValidationRules,
	handleValidationErrors,
	userController.updateUserController
);
router.delete("/:id", authGuard, userController.removeUserController);
router.get("/:id", authGuard, userController.getUserController);

export default router;
