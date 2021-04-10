import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";

const VoiceetSchema = mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  user: { type: String },
  publishedAt: { type: Date, default: Date.now },
  audio: { type: String },
});

export default mongoose.model("Voiceet", VoiceetSchema);
