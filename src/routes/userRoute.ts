import express from "express";

import {
	addUserController,
	getUserController,
	removeUserController,
	updateUserController,
} from "../controllers/userController";

import { userValidationRules } from "../utils";
import { handleValidationErrors } from "../middlewares/payloadValidationMiddleware";

const router = express.Router();

router.post(
	"/user",
	userValidationRules,
	handleValidationErrors,
	addUserController
);
router.patch(
	"/user/:id",
	userValidationRules,
	handleValidationErrors,
	updateUserController
);
router.delete("/user/:id", removeUserController);
router.get("/users", getUserController);

export default router;
