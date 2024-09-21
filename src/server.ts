import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import express, { Request, Response } from "express";

import User from "./models/user";

import userRouter from "./routes/userRoute";
import noteRouter from "./routes/notesRoute";

import { compare, hash } from "bcryptjs";
import { generateToken, SALT_ROUND, userValidationRules } from "./utils";
import { handleValidationErrors } from "./middlewares/payloadValidationMiddleware";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/notes", noteRouter);
app.use("/users", userRouter);

app.use((req, res, next) => {
	res.status(404).json({
		error: "Not Found",
		message: "The requested route does not exist",
	});
});

const PORT = process.env.PORT ?? 8000;

app.get("/", (_, res) => {
	res.status(200).send({ message: "Server is up and running" });
});

app.post("/login", async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });

		if (!user)
			return res
				.status(404)
				.send({ errorMessage: `User not found with this mail ${email}` });

		const isPasswordValid = await compare(password, user.password);

		if (!isPasswordValid)
			return res
				.status(400)
				.json({ errorMessage: "Email or password is incorrect" });

		const token = generateToken({ email: user.email, id: user.id });

		res.status(200).send({
			message: "Log in successful",
			token,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send({
			errorMessage: "Something went wrong during login.",
		});
	}
});

app.post(
	"/register",
	userValidationRules,
	handleValidationErrors,
	async (req: Request, res: Response) => {
		try {
			const hashedPassword = await hash(req.body.password, SALT_ROUND);
			const newUser = new User({
				...req.body,
				password: hashedPassword,
			});
			const savedUser = await newUser.save();
			return res
				.status(201)
				.send({ message: `User registered successfully ${savedUser.id}` });
		} catch (error) {
			console.error(error);
			return res.status(500).send({
				errorMessage: "Oops! something went wrong.",
			});
		}
	}
);

mongoose
	.connect("mongodb://localhost:27017/notes_development_db")
	.then(() => console.log("Connected to MongoDB"))
	.catch((error) => console.error("Failed to connect to MongoDB", error));

app.listen(PORT, () => console.log(`Express app running at PORT ${PORT}`));
