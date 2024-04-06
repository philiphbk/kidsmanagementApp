import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  const { id, ...updateData } = body;
  switch (method) {
    case "GET":
      try {
        const statuses = await db.getAll("status");
        res.status(200).json(statuses);
      } catch (error: any) {
        res.status(500).json({ error });
      }
      break;
    case "POST":
      try {
        await db.create("status", body);
        res.status(201).end();
      } catch (error: any) {
        res.status(500).json({ error });
      }
      break;
    case "PUT":
      try {
        await db.update("status", id, updateData);
        res.status(200).end();
      } catch (error: any) {
        res.status(500).json({ error });
      }
      break;
    case "DELETE":
      try {
        await db.delete("status", id);
        res.status(200).end();
      } catch (error: any) {
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
