import { GET, POST } from "@/app/api/audiofile/route";
import connectDB from "@/database/db";
import mongoose from "mongoose";
import audioFile from "@/database/models/audiofileSchema";
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
  await audioFile.deleteMany({ name: "Test Audio" }); // Remove duplicates before tests
});
afterAll(async () => {
  await audioFile.deleteMany({ name: "Test Audio" });
  await mongoose.disconnect(); // Disconnect after all tests are completed
});

describe("API Route Tests", () => {
  // Test cases go here...
  it("should return 200 and audio files for GET /api/audiofile", async () => {
    const response = await GET();
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
  });

  beforeEach(async () => {
    await audioFile.deleteMany({ name: "Test Audio" }); // Ensure test starts with clean state
  });

  afterEach(async () => {
    await audioFile.deleteMany({ name: "Test Audio" }); // Cleanup after each test
  });

  it("should return 201 and the new audio file for POST /api/audiofile", async () => {
    const newAudio = {
      name: "Test Audio",
      url: "https://example.com/audio.mp3",
      duration: "180",
      description: "Sample audio",
    };

    const req = new Request("http://localhost/api/audiofile", {
      method: "POST",
      body: JSON.stringify(newAudio),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(req);
    expect(response.status).toBe(201);

    const responseData = await response.json();
    expect(responseData.name).toBe(newAudio.name);
    expect(responseData.url).toBe(newAudio.url);
  });
});
