import connectDB from "@/database/db";
import POIModel from "@/database/models/POISchema";
import { NextRequest, NextResponse } from "next/server";

type IParams = {
  params: {
    _id: string;
  };
};

// endpoint to get a specific POI by id
export async function GET(req: NextRequest, { params }: IParams) {
  await connectDB();
  const { _id } = params;
  try {
    const poi = await POIModel.findById(_id).orFail();
    return NextResponse.json(poi);
  } catch (err) {
    return NextResponse.json("POI not found (PoiId = " + _id + ") " + err, { status: 404 });
  }
}
