import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import noteRouter from "./routes/notesRoute";
import userRouter from "./routes/userRoute";

const app = express();
app.use(cors());

app.use("/notes", noteRouter);
app.use("/users", userRouter);

const PORT = process.env.PORT ?? 8000;

app.get("/", (_, res) => {
	res.status(200).send({ message: "Server is up and running" });
});

mongoose
	.connect("mongodb://localhost:27017/notes_development_db")
	.then(() => console.log("Connected to MongoDB"))
	.catch((error) => console.error("Failed to connect to MongoDB", error));

app.listen(PORT, () => console.log(`Express app running at PORT ${PORT}`));
