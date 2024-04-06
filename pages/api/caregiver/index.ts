// pages/api/caregiver.ts
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  const { id, ...updateData } = body;

  const { idCaregiver } = req.query;

  const sqlQuery = `
  SELECT careGiver.firstName, careGiver.lastName
  FROM careGiver
  JOIN child ON CONCAT(careGiver.firstName, careGiver.lastName) = child.parent;
  `;

  try {
    switch (method) {
      case "GET":
        let rows: any = [];
        let sqlQuery = "";

        if (idCaregiver) {
          sqlQuery = `SELECT * FROM careGiver WHERE id = ?`;
          [rows] = await db.executeQuery(sqlQuery, [idCaregiver as string]);
        } else {
          rows = await db.getAll("careGiver");
        }

        res.status(200).json([rows]);
        break;

      case "POST":
        await db.create("careGiver", body);
        res.status(201).end();
        break;

      case "PUT":
        await db.update("careGiver", id, updateData);
        res.status(200).end();
        break;

      case "DELETE":
        await db.delete("careGiver", id);
        res.status(200).end();
        break;

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
