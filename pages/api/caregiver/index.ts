// pages/api/caregiver.ts
import { NextApiRequest, NextApiResponse } from "next";
import { connectWithRetry } from "../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  const { id, ...updateData } = body;

  const { idCaregiver } = req.query;

  const connection = await connectWithRetry();

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
          [rows] = await connection.execute(sqlQuery, [idCaregiver as string]);
        } else {
          sqlQuery = "SELECT * FROM careGiver";
          [rows] = await connection.execute(sqlQuery, []);
        }

        connection.release();
        res.status(200).json(rows);
        break;

      case "POST":
        await connection.query("INSERT INTO careGiver SET ?", body);
        res.status(201).end();
        break;

      case "PUT":
        await connection.query("UPDATE careGiver SET ? WHERE id = ?", [
          updateData,
          id,
        ]);
        res.status(200).end();
        break;

      case "DELETE":
        await connection.query("DELETE FROM careGiver WHERE id = ?", [id]);
        res.status(200).end();
        break;

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (connection && connection.release) connection.release();
  }
}
