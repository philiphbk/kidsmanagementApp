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
        const [rows] = await connection.execute("SELECT * FROM status", []);
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
        await connection.query("INSERT INTO status SET ?", body);
        res.status(201).end();
      } catch (error: any) {
        console.log(error);
        console.log(error.error);
        res.status(500).json({ error });
      }
      break;
    case "PUT":
      try {
        const { id, ...updateData } = body; // Assuming 'id' is sent in the request body
        await connection.query("UPDATE status SET ? WHERE id = ?", [
          updateData,
          id,
        ]);
        res.status(200).end();
      } catch (error: any) {
        console.log(error);
        console.log(error.error);
        res.status(500).json({ error });
      }
      break;
    case "DELETE":
      try {
        const { id } = body; // Assuming 'id' is sent in the request body
        await connection.query("DELETE FROM status WHERE id = ?", [id]);
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
