import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        // Handle registration logic here
        const { name, email, password } = req.body;

        // Perform validation and save user data to database

        res.status(200).json({ message: 'Registration successful' });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
