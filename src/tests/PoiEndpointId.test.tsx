import { GET } from "@/app/api/poi/[_id]/route";
import connectDB from "@/database/db";
import mongoose from "mongoose";
import POIModel from "@/database/models/POISchema";
import React from "react";
import { NextRequest } from "next/server";

// Mocking the Request class for tests
if (typeof Request === "undefined") {
  global.Request = class Request {
    private url: string;
    private options: any;

    constructor(url: string, options?: any) {
      this.url = url;
      this.options = options || {};
    }

    async json() {
      return JSON.parse(this.options.body || "{}");
    }
  } as any;
}

// Mock NextResponse
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data, options) => ({
      status: options?.status || 200,
      json: async () => data,
      headers: new Headers(),
    })),
  },
}));

describe("API Route Tests for /api/poi/[_id]", () => {
  const poiId = new mongoose.Types.ObjectId(); // Use a mock ObjectId
  const poiData = {
    _id: poiId,
    name: "Test POI ID",
    description: "Sample POI description",
    audioField: "audioUrl.mp3",
    isComplete: false,
  };

  beforeEach(async () => {
    // Insert the POI data before each test
    await POIModel.create(poiData);
  });

  afterEach(async () => {
    // Cleanup after each test
    await POIModel.deleteMany({ _id: poiId });
  });

  beforeAll(async () => {
    await connectDB(); // Connect to DB before all tests
  });

  afterAll(async () => {
    await mongoose.disconnect(); // Disconnect after all tests are done
  });

  // Test GET method
  it("should return 200 and the POI when GET /api/poi/[_id] is called", async () => {
    // Simulate a GET request with the mock ObjectId
    const request = new NextRequest(`http://localhost/api/poi/${poiId.toString()}`);
    const response = await GET(request, { params: { _id: poiId.toString() } });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data._id.toString()).toBe(poiId.toString());
    expect(data.name).toBe(poiData.name);
    expect(data.description).toBe(poiData.description);
    expect(data.audioField).toBe(poiData.audioField);
    expect(data.isComplete).toBe(poiData.isComplete);
  });

  // Test GET method: non-existent ID
  it("should return 404 when GET /api/poi/[id] is called with a non-existent ID", async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const request = new NextRequest(`http://localhost/api/poi/${nonExistentId.toString()}`);
    const response = await GET(request, { params: { _id: nonExistentId.toString() } });

    expect(response.status).toBe(404);
    const data = await response.json();
    expect(data).toContain("POI not found (PoiId = " + nonExistentId + ") ");
  });

  // Test GET method: invalid ObjectId
  it("should return 404 when GET /api/poi/[id] is called with an invalid ObjectId", async () => {
    const invalidId = "invalid-id";
    const request = new NextRequest(`http://localhost/api/poi/${invalidId.toString()}`);
    const response = await GET(request, { params: { _id: invalidId.toString() } });
    expect(response.status).toBe(404);
    const data = await response.json();
    expect(data).toContain("POI not found");
  });
});
