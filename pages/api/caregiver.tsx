// pages/api/parent.ts
import { NextApiRequest, NextApiResponse } from 'next';
import pool from './db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      try {
        const [rows] = await pool.query('SELECT * FROM caregiver');
        res.status(200).json(rows);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;
    case 'POST':
      try {
        await pool.query('INSERT INTO caregiver SET ?', body);
        res.status(201).end();
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;
    case 'PUT':
        try {
            const { id, ...updateData } = body; // Assuming 'id' is sent in the request body
            await pool.query('UPDATE caregiver SET ? WHERE id = ?', [updateData, id]);
            res.status(200).end();
          } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
          }
          break;
    case 'DELETE':
        try {
            const { id } = body; // Assuming 'id' is sent in the request body
            await pool.query('DELETE FROM caregiver WHERE id = ?', [id]);
            res.status(200).end();
          } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
          }
          break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
