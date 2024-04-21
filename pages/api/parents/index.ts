// pages/api/parent.ts
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

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
          rows = await db.executeQuery(sqlQuery, [idParent as string]);
        } else {
          rows = await db.getAll("parent");
        }
        res.status(200).json(rows);
        break;

      case "POST":
        await db.create("parent", body);
        res.status(201).end();
        break;

      case "PUT":
        await db.update("parent", id, updateData);
        res.status(200).end();

        break;
      case "DELETE":
        await db.delete("parent", id);
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
