import { NextApiRequest, NextApiResponse } from "next";
import { connectWithRetry } from "../db";
import { generateMagicLink, sendEmail } from "./sendEmail";


// initializeDatabase();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { method, body } = req;
  const connection = await connectWithRetry();
  switch (method) {
    case "POST":
      try {
        const { email } = body;

        const [rows] = await connection.execute("SELECT * FROM user WHERE email = ?", [email]);

        if (!rows) {
          return res.status(404).json({ error: "User not found" });
        }

        const loginLink = await generateMagicLink(email);

        const options = {
          from: "philip@gmail.com",
          to: email,
          subject: "Your Magic Login Link",
          html: `<p>Click <a href="${loginLink}">here</a> to log in.</p>`,
        }

        await sendEmail(options)
        res.status(201).end('Email sent');

      } catch (error: any) {
        console.log(error);
        console.log(error.error);
        res.status(500).json({ error });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
