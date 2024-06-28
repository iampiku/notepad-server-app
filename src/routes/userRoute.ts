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
	"/",
	userValidationRules,
	handleValidationErrors,
	addUserController
);
router.patch(
	"/:id",
	userValidationRules,
	handleValidationErrors,
	updateUserController
);
router.delete("/:id", removeUserController);
router.get("/", getUserController);

export default router;
