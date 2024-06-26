import mongoose, { Schema } from "mongoose";

interface Note {
	title: string;
	description: string;
}

export interface INotes extends Document {
	note: Note;
	createdAt: string;
	updatedAt: string;
	userId: mongoose.Schema.Types.ObjectId;
	status: "Todo" | "Completed" | "Inprogress" | "Pending";
}

const NotesSchema: Schema = new mongoose.Schema({
	note: {
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
	status: {
		type: String,
		enum: ["Todo", "Completed", "Inprogress", "Pending"],
		default: "Todo",
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

const Notes = mongoose.model<INotes>("Notes", NotesSchema);

export default Notes;
