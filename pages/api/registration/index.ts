import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../db";
import registrationServices from "./services";
import {
  ParentForm,
  ChildForm,
  CaregiverForm,
} from "@/lib/definitions/form-interfaces";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  const { id, ...updateData } = body;

  try {
    switch (method) {
      case "GET":
        const parents = await db.getAll("parent");
        res.status(200).json({ result: parents });
        break;

      case "POST":
        const { parent, child, caregiver } = body;

        const savedParent = await registrationServices.parent(parent);
        console.log("savedParent", savedParent);
        if (savedParent) {
          const careGIds = await registrationServices.careGiver(caregiver);
          console.log("careGIds", careGIds);
          if (careGIds.length > 0)
            await registrationServices.child(
              child,
              savedParent.id,
              careGIds.id
            );
        }

        res.status(201).end();
        break;

      case "PUT":
        await db.update("registration", id, updateData);
        res.status(200).end();
        break;

      case "DELETE":
        await db.delete("registration", id);
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
