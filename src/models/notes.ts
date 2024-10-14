import mongoose, { Schema } from "mongoose";

interface Note {
	title: string;
	description: string;
}

// {
// 	"title": "Meeting Notes",
// 	"content": "Discussed project timeline...",
// 	"category": "Work",
// 	"tags": ["project", "meeting"], future improvements.
// 	"priority": "high"
// }

export interface INotes extends Document {
	note: Note;
	createdAt: Date;
	updatedAt: Date;
	userId: mongoose.Schema.Types.ObjectId;
	status: "Todo" | "Completed" | "Inprogress" | "Pending";
}

const NotesSchema: Schema = new mongoose.Schema<INotes>(
	{
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
	},
	{
		timestamps: true,
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.__v;
				return ret;
			},
		},
	}
);

const Notes = mongoose.model<INotes>("Notes", NotesSchema);

export default Notes;
