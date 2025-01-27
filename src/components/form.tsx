import { put } from "@vercel/blob";
import { useState } from "react";

export function Form() {
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function uploadFile(formData: FormData) {
    "use server";

    try {
      setError(null); // Clear any previous errors

      const file = formData.get("file") as File;
      if (!file) throw new Error("No file selected");

      const blob = await put(file.name, file, {
        access: "public",
      });

      // Set the uploaded URL for feedback
      setUploadedUrl(blob.url);
    } catch (err) {
      setError((err as Error).message || "An error occurred during upload");
    }
  }

  return (
    <div>
      <form action={uploadFile}>
        <label htmlFor="file">Upload File (Image or Audio)</label>
        <input type="file" id="file" name="file" accept="audio/*,image/*" required />
        <button>Upload</button>
      </form>

      {/* Display feedback */}
      {uploadedUrl && (
        <div style={{ marginTop: "1rem" }}>
          <p>File uploaded successfully!</p>
          <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">
            View Uploaded File
          </a>
        </div>
      )}

      {error && (
        <div style={{ marginTop: "1rem", color: "red" }}>
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  );
}
