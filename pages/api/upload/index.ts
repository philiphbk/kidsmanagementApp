import { NextApiRequest, NextApiResponse } from "next";
import formidable, { IncomingForm, Fields, Files } from "formidable";
import { promises as fs, existsSync, mkdirSync } from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.resolve(process.cwd(), "public", "upload");

async function processFile(file: formidable.File): Promise<string> {
  if (!file?.mimetype?.startsWith("image/")) {
    throw new Error("Only image uploads are allowed.");
  }

  const newPath = path.join(
    uploadDir,
    file.originalFilename || file.newFilename
  );
  await fs.rename(file.filepath, newPath);
  console.log("File uploaded successfully to:", newPath);
  return newPath.replace(process.cwd(), ""); // Adjust path as needed for public URL access
}

const uploadForm = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
  }

  const form = new IncomingForm({
    multiples: true,
    keepExtensions: true,
    uploadDir,
  });

  try {
    const paths: string[] = await new Promise((resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error(err);
          return reject(err);
        }

        const uploadPromises: Promise<string>[] = [];
        Object.values(files).forEach((fileOrFiles) => {
          if (fileOrFiles) {
            if (Array.isArray(fileOrFiles)) {
              fileOrFiles.forEach((file) =>
                uploadPromises.push(processFile(file))
              );
            } else {
              uploadPromises.push(processFile(fileOrFiles));
            }
          }
        });

        Promise.all(uploadPromises).then(resolve).catch(reject);
      });
    });

    res.status(200).json({ message: "Image(s) uploaded successfully", paths });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      error: "Failed to upload image",
      details: error instanceof Error ? error.message : String(error),
    });
  }
};

export default uploadForm;
