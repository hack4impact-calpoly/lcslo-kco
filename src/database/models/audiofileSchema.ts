import mongoose, { Schema } from "mongoose";

const audiofileSchema = new Schema({
  name: { type: String, required: true, unique: true },
  url: { type: String, required: true, unique: true },
  duration: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.models.Audiofile || mongoose.model("Audiofile", audiofileSchema);
