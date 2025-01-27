import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export async function Form() {
  async function uploadFile(formData: FormData) {
    "use server";

    const file = formData.get("file") as File;

    const blob = await put(file.name, file, {
      access: "public",
    });

    revalidatePath("/");
    return blob;
  }

  return (
    <form action={uploadFile}>
      <label htmlFor="file">Upload File (Image or Audio)</label>
      <input type="file" id="file" name="file" accept="audio/*,image/*" required />
      <button>Upload</button>
    </form>
  );
}
