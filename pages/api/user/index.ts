import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../db";

// initializeDatabase();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  const { id } = body;
  switch (method) {
    case "GET":
      try {
        const users = db.getAll("user");
        res.status(200).json(users);
      } catch (error: any) {
        res.status(500).json({ error });
      }
      break;
    case "POST":
      try {
        await db.create("user", body);
        res.status(201).end();
      } catch (error: any) {
        res.status(500).json({ error });
      }
      break;
    case "PUT":
      try {
        const { id, ...updateData } = body; // Assuming 'id' is sent in the request body
        await db.update("user", id, updateData);
        res.status(200).end();
      } catch (error: any) {
        res.status(500).json({ error });
      }
      break;
    case "DELETE":
      try {
        // Assuming 'id' is sent in the request body
        await db.delete("user", id);
        res.status(200).end();
      } catch (error: any) {
        res.status(500).json({ error });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
