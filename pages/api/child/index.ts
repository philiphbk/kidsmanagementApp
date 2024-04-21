import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  const { searchWord } = req.query;
  const { idValue, child_id, parent_id, ...updateData } = req.query;
  const { id, status } = body;

  try {
    switch (method) {
      case "GET":
        let sqlQuery = "";
        let rows: any = [];

        if (searchWord) {
          sqlQuery = `SELECT * FROM child WHERE firstName = ? OR lastName = ?`;
          [rows] = await db.executeQuery(sqlQuery, [
            searchWord.toString(),
            searchWord.toString(),
          ]);
        } else if (idValue) {
          sqlQuery = `SELECT parentId FROM child WHERE id = ?`;
          [rows] = await db.executeQuery(sqlQuery, [idValue.toString()]);
        } else if (id) {
          sqlQuery = "SELECT * FROM child LIMIT 10";
          [rows] = await db.executeQuery(sqlQuery);
        } else {
          rows = await db.getAll("child");
        }

        res.status(200).json(rows);
        break;

      case "POST":
        let query = "";
        if (status) {
          query = "UPDATE child SET status = ?";
          await db.executeQuery(query, [status]);
          res
            .status(200)
            .json({ success: true, message: "Status updated successfully." });
        } else {
          await db.create("child", body);
        }
        res.status(201).end();
        break;

      case "PUT":
        let queryUpdate = "";
        if (status && id) {
          queryUpdate = "UPDATE child SET status = ? WHERE id = ?";
          await db.executeQuery(queryUpdate, [status, id]);
          res
            .status(200)
            .json({ success: true, message: "Status updated successfully." });
        } else {
          await db.update("child", id, updateData);
        }
        res.status(200).end();
        break;

      case "DELETE":
        await db.delete("child", id);
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
