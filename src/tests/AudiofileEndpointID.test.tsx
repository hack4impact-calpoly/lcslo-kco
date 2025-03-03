import { GET, PUT } from "@/app/api/audiofile/[_id]/route";
import connectDB from "@/database/db";
import mongoose from "mongoose";
import Audiofile from "@/database/models/audiofileSchema";

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

describe("API Route Tests for /api/audiofile/[_id]", () => {
  const audiofileId = new mongoose.Types.ObjectId(); // Use a mock ObjectId
  const audiofileData = {
    _id: audiofileId,
    name: "Test Audio ID",
    url: "https://example.com/audioId.mp3",
    duration: "180",
    description: "Sample audio",
  };

  beforeEach(async () => {
    // Insert the audiofile data before each test
    await Audiofile.create(audiofileData);
  });

  afterEach(async () => {
    // Cleanup after each test
    await Audiofile.deleteMany({ _id: audiofileId });
  });

  beforeAll(async () => {
    await connectDB(); // Connect to DB before all tests
  });

  afterAll(async () => {
    await mongoose.disconnect(); // Disconnect after all tests are done
  });

  // Test GET method
  it("should return 200 and the audiofile when GET /api/audiofile/[_id] is called", async () => {
    // Simulate a GET request with the mock ObjectId
    const request = { params: { _id: audiofileId.toString() } };
    const response = await GET(null, request);

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data._id.toString()).toBe(audiofileId.toString());
    expect(data.name).toBe(audiofileData.name);
    expect(data.url).toBe(audiofileData.url);
    expect(data.duration).toBe(audiofileData.duration);
    expect(data.description).toBe(audiofileData.description);
  });
  // Test GET method: non-existent ID
  it("should return 404 when GET /api/audiofile/[id] is called with a non-existent ID", async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const request = { params: { _id: nonExistentId.toString() } };
    const response = await GET(null, request);

    expect(response.status).toBe(404);
    const data = await response.json();
    expect(data.error).toBe("Audiofile not found.");
  });

  // Test GET method: invalid ObjectId
  it("should return 400 when GET /api/audiofile/[id] is called with an invalid ObjectId", async () => {
    const invalidId = "invalid-id";
    const request = { params: { _id: invalidId } };
    const response = await GET(null, request);

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe("Invalid audiofile ID.");
  });

  // Test PUT method: valid update
  it("should return 200 and the updated audiofile when PUT /api/audiofile/[id] is called with valid data", async () => {
    const updatedData = {
      name: "Updated Audio",
      duration: "200",
      description: "Updated description",
    };

    // Simulate a PUT request with the updated data
    const request = {
      params: { _id: audiofileId.toString() },
      json: jest.fn().mockResolvedValue(updatedData),
    };
    const response = await PUT(request, { params: { _id: audiofileId.toString() } });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.name).toBe(updatedData.name);
    expect(data.duration).toBe(updatedData.duration);
    expect(data.description).toBe(updatedData.description);
  });

  // Test PUT method: non-existent ID
  it("should return 404 when PUT /api/audiofile/[id] is called with a non-existent ID", async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const updatedData = {
      name: "Updated Audio",
      duration: "200",
      description: "Updated description",
    };

    const request = {
      params: { _id: nonExistentId.toString() },
      json: jest.fn().mockResolvedValue(updatedData),
    };
    const response = await PUT(request, { params: { _id: nonExistentId.toString() } });

    expect(response.status).toBe(404);
    const data = await response.json();
    expect(data.error).toBe("Audiofile not found.");
  });

  // Test PUT method: invalid ObjectId
  it("should return 400 when PUT /api/audiofile/[id] is called with an invalid ObjectId", async () => {
    const invalidId = "invalid-id";
    const updatedData = {
      name: "Updated Audio",
      duration: "200",
      description: "Updated description",
    };

    const request = {
      params: { _id: invalidId },
      json: jest.fn().mockResolvedValue(updatedData),
    };
    const response = await PUT(request, { params: { _id: invalidId } });

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe("Invalid audiofile ID.");
  });

  it("should log an error when fetching the audiofile fails with a generic error", async () => {
    // Spying on the console.error to track if it's called
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    // Mocking the Audiofile.findById().exec() to throw a generic error
    const mockFindById = jest.spyOn(Audiofile, "findById").mockReturnValue({
      exec: jest.fn().mockRejectedValue(new Error("Generic database error")),
    });

    const request = new Request("http://localhost/api/audiofile/1", {
      method: "GET",
    });

    const params = { _id: "1" };

    const response = await GET(request, { params });

    // Check if console.error was called with the expected error message
    expect(consoleErrorSpy).toHaveBeenCalledWith("Error fetching audiofile:", expect.any(Error));

    // Check the response status is 500 (internal server error)
    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data.error).toBe("Error: Unable to fetch the audiofile.");

    // Clean up the mocks
    consoleErrorSpy.mockRestore();
    mockFindById.mockRestore();
  });
});
