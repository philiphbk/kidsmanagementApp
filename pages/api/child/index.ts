import { NextApiRequest, NextApiResponse } from "next";
import { connectWithRetry } from "../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  const { searchWord } = req.query;
  const { idValue, child_id, parent_id, ...updateData } = req.query;
  const { id, status } = body;
  const connection = await connectWithRetry();

  console.log("status", status);
  console.log("child_id", id);

  try {
    switch (method) {
      case "GET":
        let sqlQuery = "";
        let rows: any = [];

        if (searchWord) {
          sqlQuery = `SELECT * FROM child WHERE firstName = ? OR lastName = ?`;
          [rows] = await connection.execute(sqlQuery, [searchWord, searchWord]);
        } else if (idValue) {
          sqlQuery = `SELECT parentId FROM child WHERE id = ?`;
          [rows] = await connection.execute(sqlQuery, [idValue]);
        } else {
          sqlQuery = "SELECT * FROM child LIMIT 10";
          [rows] = await connection.execute(sqlQuery);
        }
        connection.release();
        res.status(200).json(rows);
        break;

      case "POST":
        let query = "";
        if (status) {
          query = "UPDATE child SET status = ?";
          await connection.execute(query, [status]);
          connection.release();
          res
            .status(200)
            .json({ success: true, message: "Status updated successfully." });
        } else {
          await connection.query("INSERT INTO child SET ?", body);
        }
        res.status(201).end();
        break;

      case "PUT":
        let queryUpdate = "";
        if (status && id) {
          queryUpdate = "UPDATE child SET status = ? WHERE id = ?";
          await connection.execute(queryUpdate, [status, id]);
          connection.release();
          res
            .status(200)
            .json({ success: true, message: "Status updated successfully." });
        } else {
          await connection.query("UPDATE child SET ? WHERE id = ?", [
            updateData,
            id,
          ]);
        }

        connection.release();
        res.status(200).end();

        break;

      case "DELETE":
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
