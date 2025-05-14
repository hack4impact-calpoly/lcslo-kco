import { GET } from "@/app/api/poi/route"; // Your GET and POST handlers
import connectDB from "@/database/db";
import mongoose from "mongoose";
import POIModel from "@/database/models/POISchema";
import React from "react";

// Mocking the Request class in case it's undefined
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
// Type definition for POI objects
interface POI {
  name: string;
  description: string;
  audioField: string;
  isComplete: boolean;
}

beforeAll(async () => {
  await connectDB(); // Connect to the DB before all tests
});

afterAll(async () => {
  await mongoose.disconnect(); // Disconnect after all tests are completed
});

describe("API Route Tests for /api/poi", () => {
  // Test for GET /api/poi (fetching all POIs)
  it("should return 200 and a list of POIs for GET /api/poi", async () => {
    // Set up a mock POI in the database to test
    const newPOI = new POIModel({
      name: "Test POI",
      description: "Test description",
      audioField: "https://example.com/audio.mp3", // Add the audioField
      isComplete: true, // Add isComplete
    });

    await newPOI.save(); // Save the POI to the DB

    const response = await GET();
    expect(response.status).toBe(200);

    const data = (await response.json()) as { POIs: POI[] };

    expect(Array.isArray(data.POIs)).toBe(true);
    expect(data.POIs.length).toBeGreaterThan(0); // Ensure we have at least one POI

    // Check if the newly created POI is in the list
    const createdPOI = data.POIs.find((poi) => poi.name === "Test POI");
    expect(createdPOI).toBeDefined(); // Ensure the POI exists in the list
    expect(createdPOI?.name).toBe("Test POI");
    expect(createdPOI?.description).toBe("Test description");
    expect(createdPOI?.audioField).toBe("https://example.com/audio.mp3");
    expect(createdPOI?.isComplete).toBe(true);
  });

  // Clean up after each test
  beforeEach(async () => {
    await POIModel.deleteMany({ name: "Test POI" }); // Ensure a clean state before each test
  });

  afterEach(async () => {
    await POIModel.deleteMany({ name: "Test POI" }); // Cleanup after each test
  });
});
