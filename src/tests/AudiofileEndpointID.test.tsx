import { GET, PUT } from "@/app/api/audiofile/[_id]/route";
import connectDB from "@/database/db";
import mongoose from "mongoose";
import Audiofile from "@/database/models/audiofileSchema";
import request from "supertest";

// Mocking the resquest apparently
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

beforeAll(async () => {
  await connectDB(); // Connect to the DB before all tests
});
afterAll(async () => {
  await Audiofile.deleteMany({ name: "Test Audio" });
  await mongoose.disconnect(); // Disconnect after all tests are completed
});

describe("Audiofile API Tests", () => {
  let testAudiofileId: string;

  // Insert a sample audio file for testing
  beforeAll(async () => {
    // Connect to the database before tests
    await connectDB();

    // Insert a sample audio file for testing
    const newAudiofile = new Audiofile({
      name: "Test Audio",
      url: "https://example.com/audio.mp3",
      duration: "1:30",
      description: "Test audio description",
    });
    const savedAudiofile = await newAudiofile.save();
    testAudiofileId = savedAudiofile._id.toString();
  });

  afterAll(async () => {
    // Clean up by deleting test data and disconnecting from DB
    await mongoose.disconnect();
  });

  // Test for GET request (fetch audio file by ID)
  it("should return 200 and the audio file for valid _id", async () => {
    const response = await request("http://localhost") // Directly hit the Next.js app
      .get(`/api/audiofile/${testAudiofileId}`) // Simulate GET request to your Next.js API
      .expect(200); // Expecting status 200

    const data = response.body;
    expect(data.name).toBe("Test Audio");
  });

  //   it("should return 400 for invalid _id", async () => {
  //     const invalidId = "invalidObjectId";
  //     const request = new Request(`http://localhost/api/audiofile/${invalidId}`);
  //     const response = await GET(request, { params: { _id: invalidId } });

  //     expect(response.status).toBe(400);
  //     const data = await response.json();
  //     expect(data.error).toBe("Invalid audiofile ID.");
  //   });

  //   it("should return 404 if audio file not found", async () => {
  //     const nonExistentId = mongoose.Types.ObjectId();
  //     const request = new Request(`http://localhost/api/audiofile/${nonExistentId}`);
  //     const response = await GET(request, { params: { _id: nonExistentId.toString() } });

  //     expect(response.status).toBe(404);
  //     const data = await response.json();
  //     expect(data.error).toBe("Audiofile not found.");
  //   });

  //   // Test for PUT request (update audio file by ID)
  //   it("should return 200 and updated audio file", async () => {
  //     const updatedData = {
  //       name: "Updated Test Audio",
  //       duration: 200,
  //       description: "Updated description",
  //     };

  //     const request = new Request(`http://localhost/api/audiofile/${testAudiofileId}`, {
  //       method: "PUT",
  //       body: JSON.stringify(updatedData),
  //       headers: { "Content-Type": "application/json" },
  //     });

  //     const response = await PUT(request, { params: { _id: testAudiofileId } });

  //     expect(response.status).toBe(200);
  //     const data = await response.json();
  //     expect(data.name).toBe(updatedData.name);
  //     expect(data.duration).toBe(updatedData.duration);
  //     expect(data.description).toBe(updatedData.description);
  //   });

  //   it("should return 404 for non-existing audio file on PUT", async () => {
  //     const nonExistentId = mongoose.Types.ObjectId();
  //     const updatedData = {
  //       name: "Updated Test Audio",
  //       duration: 200,
  //       description: "Updated description",
  //     };

  //     const request = new Request(`http://localhost/api/audiofile/${nonExistentId}`, {
  //       method: "PUT",
  //       body: JSON.stringify(updatedData),
  //       headers: { "Content-Type": "application/json" },
  //     });

  //     const response = await PUT(request, { params: { _id: nonExistentId.toString() } });

  //     expect(response.status).toBe(404);
  //     const data = await response.json();
  //     expect(data.error).toBe("Audiofile not found.");
  //   });

  //   it("should return 400 for invalid _id in PUT", async () => {
  //     const invalidId = "invalidObjectId";
  //     const updatedData = {
  //       name: "Updated Test Audio",
  //       duration: 200,
  //       description: "Updated description",
  //     };

  //     const request = new Request(`http://localhost/api/audiofile/${invalidId}`, {
  //       method: "PUT",
  //       body: JSON.stringify(updatedData),
  //       headers: { "Content-Type": "application/json" },
  //     });

  //     const response = await PUT(request, { params: { _id: invalidId } });

  //     expect(response.status).toBe(400);
  //     const data = await response.json();
  //     expect(data.error).toBe("Invalid audiofile ID.");
  //   });
});
