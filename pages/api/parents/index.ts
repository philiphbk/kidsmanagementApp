// pages/api/parent.ts
import { NextApiRequest, NextApiResponse } from "next";
import { connectWithRetry } from "../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  const connection = await connectWithRetry();

  const { id, ...updateData } = body;
  //   SELECT parent.firstName, parent.lastName
  //   FROM parent
  //   JOIN child ON CONCAT(parent.firstName, parent.lastName) = child.parent;
  // `;
  const { idParent } = req.query;

  try {
    switch (method) {
      case "GET":
        let rows: any = [];
        let sqlQuery = "";

        if (idParent) {
          sqlQuery = `SELECT * FROM parent WHERE id = ?`;
          [rows] = await connection.execute(sqlQuery, [idParent as string]);
        } else {
          sqlQuery = "SELECT * FROM parent";
          [rows] = await connection.execute(sqlQuery, []);
        }
        connection.release();
        res.status(200).json(rows);
        break;

      case "POST":
        await connection.query("INSERT INTO parent SET ?", body);
        res.status(201).end();
        break;

      case "PUT":
        await connection.query("UPDATE parent SET ? WHERE id = ?", [
          updateData,
          id,
        ]);
        res.status(200).end();

        break;
      case "DELETE":
        await connection.query("DELETE FROM parent WHERE id = ?", [id]);
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
    // Ensure the connection is always released
    if (connection && connection.release) connection.release();
  }
}
