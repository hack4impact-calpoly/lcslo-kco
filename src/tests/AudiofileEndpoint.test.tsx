import { createMocks } from "node-mocks-http";
import { GET, POST } from "@/app/api/audiofile/route";

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

// Mock the actual module, so this part pretends to be the Model
jest.mock("@/database/models/audiofileSchema", () => {
  // Define the mocks first
  const mockSave = jest.fn();
  const mockFind = jest.fn();
  const mockExec = jest.fn();

  // Create a proper mock for the Audiofile model
  const mockConstructor = jest.fn().mockImplementation(function (data: any) {
    return {
      ...data,
      save: mockSave.mockResolvedValue(data),
    };
  }) as jest.Mock & { find: jest.Mock }; // Add type for `find`

  // Attach the `find` method to the mock constructor
  mockConstructor.find = mockFind.mockReturnValue({
    exec: mockExec.mockResolvedValue([]), // Default empty array for find().exec()
  });

  return {
    __esModule: true,
    default: mockConstructor,
    mockSave, // Export the mock variables for use in tests, would get mockSave not found if not, cause of hoisting problem or something
    mockFind,
    mockExec,
    mockConstructor,
  };
});

// Import the mock variables from the mocked module
const { mockSave, mockFind, mockExec, mockConstructor } = require("@/database/models/audiofileSchema");

// mocking db connection
jest.mock("@/database/db", () => {
  return {
    __esModule: true,
    default: jest.fn().mockResolvedValue(true),
  };
});

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

describe("API Route Tests", () => {
  const mockAudiofiles = [
    { name: "Test Audio 1", url: "https://example.com/audio1.mp3" },
    { name: "Test Audio 2", url: "https://example.com/audio2.mp3" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup the find method to return mock audio files
    mockExec.mockResolvedValue(mockAudiofiles);
  });

  it("should return 200 and audio files for GET /api/audiofile", async () => {
    const response = await GET();
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data).toEqual(mockAudiofiles);

    // Verify find was called
    expect(mockFind).toHaveBeenCalled();
    expect(mockExec).toHaveBeenCalled();
  });

  it("should return 404 when no audio files are found", async () => {
    // Override default mock for this test only
    mockExec.mockResolvedValue([]);

    const response = await GET();
    expect(response.status).toBe(404);

    const data = await response.json();
    expect(data).toHaveProperty("error", "No audio files found.");

    expect(mockFind).toHaveBeenCalled();
    expect(mockExec).toHaveBeenCalled();
  });

  it("should return 201 and the new audiofile for POST /api/audiofile", async () => {
    const newAudio = {
      name: "Test Audio",
      url: "https://example.com/audio.mp3",
      duration: 180,
      description: "Sample audio",
    };

    mockSave.mockResolvedValue({
      name: newAudio.name,
      url: newAudio.url,
      duration: newAudio.duration,
      description: newAudio.description,
    });

    // Create a mock Request object
    const req = new Request("http://localhost/api/audiofile", {
      method: "POST",
      body: JSON.stringify(newAudio),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(req);
    expect(response.status).toBe(201);

    // Verify constructor was called
    expect(mockConstructor).toHaveBeenCalledWith(
      expect.objectContaining({
        name: newAudio.name,
        url: newAudio.url,
      }),
    );

    // Verify save was called
    expect(mockSave).toHaveBeenCalled();

    const responseData = await response.json();
    // apparent mongoose strips away the .save() before sending reponse, while Jest doesn't so we strip here
    const { save, ...filteredData } = responseData;

    expect(filteredData).toEqual(newAudio);
  });

  it("should return 400 if name or url is missing for POST /api/audiofile", async () => {
    const req = new Request("http://localhost/api/audiofile", {
      method: "POST",
      body: JSON.stringify({ name: "", url: "" }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(req);
    expect(response.status).toBe(400);

    const responseData = await response.json();
    expect(responseData.error).toBe("Name and URL are required fields.");
  });
});
