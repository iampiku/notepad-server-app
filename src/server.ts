import cors from "cors";
import express from "express";

import noteRouter from "./routes/notesRoute";

const app = express();
app.use(cors());

app.use("/note", noteRouter);

const PORT = process.env.PORT ?? 8000;

app.get("/api", (_, res) => {
	res.status(200).send({ message: "Server is up and running" });
});

app.listen(PORT, () => console.log(`Express app running at PORT ${PORT}`));
