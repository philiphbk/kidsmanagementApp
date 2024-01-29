import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jwt-simple";
import { signIn } from "next-auth/react";
import findUserByEmail from "@/lib/findUserByEmail";

const SECRET_KEY = "secret"; // Same as used above.

const callbackHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.query;

  try {
    const { email, exp } = jwt.decode(token as string, SECRET_KEY);

    if (Date.now() > exp) {
      return res.status(401).end("Token expired");
    }

    const user = await findUserByEmail(email);
    
    if (!user) {
      return res.status(401).end("User not found");
    }

    // Sign in the user
    const result = await signIn("credentials", {
      redirect: false,
      token,
    });

    
    if (result?.error) {
      return res.status(401).end("Error logging in");
    }
    res.redirect("/jcadmin/overview");
  } catch (error) {
    res.status(401).end("Invalid token");
  }
};

export default callbackHandler;
