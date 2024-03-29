import { NextApiRequest, NextApiResponse } from "next";
import { connectWithRetry } from "../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  const { idValue, child_id, parent_id, status, ...updateData } = req.query;

  const connection = await connectWithRetry();

  try {
    switch (method) {
      case "GET":
        let sqlQuery = "";
        let rows: any = [];
        sqlQuery = "SELECT * FROM activity_log LIMIT 10";
        [rows] = await connection.execute(sqlQuery);
        connection.release();
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
          await connection.execute(query, [child_id, parent_id, status]);
          connection.release();
          res
            .status(200)
            .json({ success: true, message: "Status updated successfully." });
        } else {
          await connection.query("INSERT INTO activity_log SET ?", body);
        }
        res.status(201).end();
        break;

      case "PUT":
        await connection.query("UPDATE activity_log SET ? WHERE id = ?", [
          updateData,
          child_id,
        ]);
        connection.release();
        res.status(200).end();

        break;

      case "DELETE":
        const { id } = body; // Assuming 'id' is sent in the request body
        await connection.query("DELETE FROM activity_log WHERE id = ?", [id]);
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
