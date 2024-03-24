import jwt from "jwt-simple";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

interface SendEmailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export const generateMagicLink = async (email: string) => {
  const secretKey = process.env.SECRET_KEY || ""; // Set a default value if SECRET_KEY is undefined
  const token = jwt.encode({ email, exp: Date.now() + 36000 }, secretKey); // Token expires in 1 hour.
  const link = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback?token=${token}`;
  console.log(link);
  return link;
};

export const sendEmail = async (options: SendEmailOptions) => {
  const user_email = process.env.USER_EMAIL || "";
  const user_password = process.env.USER_PASSWORD || "";
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: user_email, // Your Gmail address
      pass: user_password, // Your Gmail password
    },
  });

  await transporter.sendMail({
    from: options.from,
    to: options.to,
    subject: options.subject,
    html: options.html,
  });
};
