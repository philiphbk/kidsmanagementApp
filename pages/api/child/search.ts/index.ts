import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: 'Name parameter is required' });
  }

  try {
    const result = await db('child').textSearch(name as string);

    res.json(result);
  } catch (error) {
    console.error('Error executing MySQL query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
