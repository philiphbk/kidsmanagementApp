import jwt from "jwt-simple";
import nodemailer from "nodemailer";
import config from '../config';

interface SendEmailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export const generateMagicLink = async (email: string) => {
  const token = jwt.encode({ email, exp: Date.now() + 36000 }, config.SECRET_KEY); // Token expires in 1 hour.
  const link = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback?token=${token}`;
  console.log(link);
  return link;
}

export const sendEmail = async (options: SendEmailOptions) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "philipfajorin@gmail.com", // Your Gmail address
      pass: "erctdszgweijuxdb", // Your Gmail password
    },
  });

  await transporter.sendMail({
    from: options.from,
    to: options.to,
    subject: options.subject,
    html: options.html,
  });
}
