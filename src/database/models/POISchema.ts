import mongoose, { Schema } from "mongoose";

// typescript type (can also be an interface)
export type Poi = {
  name: string;
  description: string;
  image: string;
  audioField: mongoose.Types.ObjectId;
  isComplete: boolean;
};

// mongoose schema
const POISchema = new Schema<Poi>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  audioField: { type: mongoose.Schema.Types.ObjectId, ref: "Audiofile", required: true },
  isComplete: { type: Boolean, required: true },
});

// defining the collection and model
const POIModel = mongoose.models["POIs"] || mongoose.model("POIs", POISchema);

export default POIModel;
