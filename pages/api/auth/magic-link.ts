import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import jwt from "jwt-simple";
import { getSession, useSession } from "next-auth/react";
import User from "@/lib/definitions/user";

const SECRET_KEY = "secret"; // Use a secure, unique secret key.

async function sendMagicLink(email: string) {

  const token = jwt.encode({ email, exp: Date.now() + 360000 }, SECRET_KEY); // Token expires in 1 hour.
  const link = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback?token=${token}`;

  // Configure Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "philipfajorin@gmail.com", // Your Gmail address
      pass: "erctdszgweijuxdb", // Your Gmail password
    },
  });

  await transporter.sendMail({
    from: "philip@gmail.com",
    to: email,
    subject: "Your Magic Login Link",
    html: `<p>Click <a href="${link}">here</a> to log in.</p>`,
  });
}

const magicLinkHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;

  // Check if the user exists in the database
  const user = await User.findOne({
    where: { email: email },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }


  await sendMagicLink(email);
  res.status(200).json({ message: "Magic link sent." });
};

export default magicLinkHandler;
