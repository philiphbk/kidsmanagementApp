// pages/api/parent.ts
import { NextApiRequest, NextApiResponse } from "next";
import { connectWithRetry } from "../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  const { searchWord } = req.query;

  const connection = await connectWithRetry();
  const firstNameSearch = "%searchWord%";
  const lastNameSearch = "%searchWord%";

  try {
    switch (method) {
      case "GET":
        let sqlQuery = "";
        let rows: any = [];

        if (searchWord) {
          sqlQuery =
            "SELECT * FROM child WHERE firstName = ${firstNameSearch} OR lastName = ${lastNameSearch} LIMIT 10";
          [rows] = await connection.execute(sqlQuery, [
            firstNameSearch,
            lastNameSearch,
          ]);
        } else {
          sqlQuery = "SELECT * FROM child LIMIT 10";
          [rows] = await connection.execute(sqlQuery);
        }
        connection.release();
        res.status(200).json(rows);
        break;

      case "POST":
        await connection.query("INSERT INTO child SET ?", body);
        res.status(201).end();
        break;

      case "PUT":
        // Check if this is a status update
        if (
          "status" in body &&
          Object.keys(body).length === 2 &&
          "id" in body
        ) {
          // Handle status update
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
        } else {
          // Handle other updates

          const { id, ...updateData } = body;
          await connection.query("UPDATE child SET ? WHERE id = ?", [
            updateData,
            id,
          ]);
          connection.release();
          res.status(200).end();
        }
        break;

      case "DELETE":
        const { id } = body; // Assuming 'id' is sent in the request body
        await connection.query("DELETE FROM child WHERE id = ?", [id]);
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
