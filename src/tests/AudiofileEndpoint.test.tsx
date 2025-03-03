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
});

afterAll(async () => {
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

  it("should error when missing required field POST /api/audiofile", async () => {
    const newAudio = {
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
    expect(response.status).toBe(400);

    const responseData = await response.json();
    expect(responseData.error).toBe("Name and URL are required fields.");
  });

  it("should log an error when fetching audio files fails", async () => {
    // Mocking the `console.error` method to spy on it
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    // Mocking Audiofile.find() to return a mocked query object with an exec method
    const mockFind = jest.spyOn(audioFile, "find").mockReturnValue({
      exec: jest.fn().mockRejectedValue(new Error("Database connection failed")),
    });

    const response = await GET();

    // Checking if console.error was called with the expected message
    expect(consoleErrorSpy).toHaveBeenCalledWith("Error fetching audio files:", expect.any(Error));

    // Check that the response status is 500
    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data.error).toBe("Error: Unable to fetch audio files.");

    // Clean up spies
    consoleErrorSpy.mockRestore();
    mockFind.mockRestore();
  });
});
