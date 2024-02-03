// pages/api/parent.ts
import { NextApiRequest, NextApiResponse } from "next";
import { connectWithRetry } from "../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  const connection = await connectWithRetry();
  switch (method) {
    case "GET":
      try {
        const [rows] = await connection.execute("SELECT * FROM child", []);
        connection.release();
        res.status(200).json(rows);
      } catch (error: any) {
        console.log(error);
        console.log(error.error);
        res.status(500).json({ error });
      }
      break;
    case "POST":
      try {
        await connection.query("INSERT INTO child SET ?", body);
        res.status(201).end();
      } catch (error: any) {
        console.log(error);
        console.log(error.error);
        res.status(500).json({ error });
      }
      break;
    case "PUT":
      // Check if this is a status update
      if ("status" in body && Object.keys(body).length === 2 && "id" in body) {
        // Handle status update
        try {
          const { id, status } = body;
          const query = "UPDATE child SET status = ? WHERE id = ?";
          await connection.execute(query, [status, id]);
          const logQuery =
            "INSERT INTO activity_log (child_id, status) VALUES (?, ?)";
          await connection.execute(logQuery, [id, status]);
          connection.release();
          res
            .status(200)
            .json({ success: true, message: "Status updated successfully." });
        } catch (error: any) {
          console.error("Error updating status:", error);
          res.status(500).json({ error: "Internal server error" });
        }
      } else {
        // Handle other updates
        try {
          const { id, ...updateData } = body;
          await connection.query("UPDATE child SET ? WHERE id = ?", [
            updateData,
            id,
          ]);
          connection.release();
          res.status(200).end();
        } catch (error: any) {
          console.error(error);
          res.status(500).json({ error: "Internal server error" });
        }
      }
    case "DELETE":
      try {
        const { id } = body; // Assuming 'id' is sent in the request body
        await connection.query("DELETE FROM child WHERE id = ?", [id]);
        res.status(200).end();
      } catch (error: any) {
        console.log(error);
        console.log(error.error);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
