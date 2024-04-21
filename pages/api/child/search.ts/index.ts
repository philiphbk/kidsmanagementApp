import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { name, page = 1, pageSize = 10 } = req.query;
  page = parseInt(page as string);
  pageSize = parseInt(pageSize as string);

  if (!name) {
    return res.status(400).json({ error: "Name parameter is required" });
  }

  try {
    const offset = (page - 1) * pageSize;
    const params = {
      searchTerm: name as string,
      offset,
      pageSize,
    };
    const result = await db.textSearch("child", params);

    res.json(result);
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
