import mongoose, { Schema } from "mongoose";

// typescript type (can also be an interface)
export type Poi = {
  id: string;
  name: string;
  description: string;
  audioField: string;
  isComplete: boolean;
};

// mongoose schema
const POISchema = new Schema<Poi>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  audioField: { type: String, required: true },
  isComplete: { type: Boolean, required: true },
});

// defining the collection and model
const POIModel = mongoose.models["POIs"] || mongoose.model("POIs", POISchema);

export default POIModel;
