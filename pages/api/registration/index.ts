import { NextApiRequest, NextApiResponse } from "next";
import { connectWithRetry } from "../db";
import registrationServices from "./services";
import { Parent, Child, Caregiver } from "@/lib/definitions/form-interfaces";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  const { id, ...updateData } = body;
  const connection = await connectWithRetry();

  try {
    switch (method) {
      case "GET":
        const [rows] = await connection.execute("SELECT * FROM parent", []);
        connection.release();
        res.status(200).json({ result: rows });
        break;

      case "POST":
        console.log("this is body", body);
        const { parent, child, caregiver } = body;

        const savedParent = await registrationServices.parent(parent);
        if(savedParent){
          const careGIds =  await registrationServices.careGiver(caregiver);
          if(careGIds.length > 0)
            await registrationServices.child(child, careGIds);
        }
       
        res.status(201).end();
        break;

      case "PUT":
        await connection.query("UPDATE registration SET ? WHERE id = ?", [
          updateData,
          id,
        ]);
        res.status(200).end();
        break;

      case "DELETE":
        await connection.query("DELETE FROM registration WHERE id = ?", [id]);
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
