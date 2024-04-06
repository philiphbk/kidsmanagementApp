import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  const { idValue, child_id, parent_id, status, ...updateData } = req.query;
  const { id } = body;
  try {
    switch (method) {
      case "GET":
        let sqlQuery = "";
        let rows: any = [];
        sqlQuery = "SELECT * FROM activity_log LIMIT 10";
        [rows] = await db.executeQuery(sqlQuery);
        res.status(200).json(rows);
        break;

      case "POST":
        let query = "";
        // if (status) {
        //   query = "UPDATE activity_log SET status = ?";
        //   await connection.execute(query, [status]);
        //   connection.release();
        //   res
        //     .status(200)
        //     .json({ success: true, message: "Status updated successfully." });
        // } else
        if (status && child_id && parent_id) {
          query =
            "INSERT INTO activity_log (child_id, parent_id, status) VALUES (?, ?, ?)";
          await db.executeQuery(query, [
            child_id.toString(),
            parent_id.toString(),
            status.toString(),
          ]);
          res
            .status(200)
            .json({ success: true, message: "Status updated successfully." });
        } else {
          await db.create("activity_log", body);
        }
        res.status(201).end();
        break;

      case "PUT":
        await db.executeQuery("UPDATE activity_log SET ? WHERE id = ?", [
          updateData.toString(),
          child_id?.toString() || "",
        ]);
        res.status(200).end();
        break;

      case "DELETE":
        await db.delete("activity_log", id);
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
