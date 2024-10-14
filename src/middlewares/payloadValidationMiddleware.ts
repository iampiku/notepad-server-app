import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const handleValidationErrors = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user = req.body.user;
	const errors = validationResult(req.body.note);
	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.array() });
	next();
};
