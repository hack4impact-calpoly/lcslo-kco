"use client";

import type { PutBlobResult } from "@vercel/blob";
import { useState, useRef } from "react";

export default function FileUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [fileType, setFileType] = useState<string>(""); // Track the file type for better messaging

  return (
    <>
      <h1>Upload Your File (Image or Audio)</h1>

      <form
        onSubmit={async (event) => {
          event.preventDefault();

          if (!inputFileRef.current?.files) {
            throw new Error("No file selected");
          }

          const file = inputFileRef.current.files[0];
          setFileType(file.type.startsWith("audio/") ? "audio" : "image");

          const response = await fetch(`/api/upload?filename=${file.name}`, {
            method: "POST",
            body: file,
          });

          const newBlob = (await response.json()) as PutBlobResult;

          setBlob(newBlob);
        }}
      >
        {/* Allow both image and audio file uploads */}
        <input name="file" ref={inputFileRef} type="file" accept="audio/*,image/*" required />
        <button type="submit">Upload</button>
      </form>

      {blob && (
        <div>
          <p>File type uploaded: {fileType}</p>
          <p>
            Blob URL:{" "}
            <a href={blob.url} target="_blank" rel="noopener noreferrer">
              {blob.url}
            </a>
          </p>
        </div>
      )}
    </>
  );
}
