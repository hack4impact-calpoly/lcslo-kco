import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export default function Form() {
  async function uploadFile(formData: FormData): Promise<void> {
    "use server";

    const file = formData.get("file") as File;

    if (!file) {
      throw new Error("No file selected");
    }

    await put(file.name, file, {
      access: "public",
    });

    revalidatePath("/"); // Optional: Revalidate the page or path if needed
  }

  return (
    <form action={uploadFile}>
      <label htmlFor="file">Upload File (Image or Audio)</label>
      <input type="file" id="file" name="file" accept="audio/*,image/*" required />
      <button type="submit">Upload</button>
    </form>
  );
}
