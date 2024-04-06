import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../db";
import { generateMagicLink, sendEmail } from "./sendEmail";

// initializeDatabase();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  switch (method) {
    case "POST":
      try {
        const { email } = body;

        console.log(email);

        const rows = await db.getAll("user", email);

        if (!rows) {
          return res.status(404).json({ error: "User not found" });
        }

        const loginLink = await generateMagicLink(email);

        const options = {
          from: "philip@gmail.com",
          to: email,
          subject: "Your Magic Login Link",
          html: `<p>Click <a href="${loginLink}">here</a> to log in.</p>`,
        };

        await sendEmail(options);
        res.status(201).end("Email sent");
      } catch (error: any) {
        res.status(500).json({ error });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
