import type { NextApiRequest, NextApiResponse } from "next";
import { signIn } from "next-auth/react";
import * as jwt from "jsonwebtoken";
import { db } from "../db";

const SECRET_KEY = "wowthisisabadsecret12345"; // Same as used above.

// Define the JWT payload interface
interface JwtPayload {
  email: string;
  exp: number;
}

const callbackHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.query;
  const { email } = req.body;
  try {
    // Verify the token and assert its type
    const decoded = jwt.verify(token as string, SECRET_KEY) as JwtPayload;

    if (Date.now() >= decoded.exp * 1000) { // Note: JWT exp is in seconds
      return res.status(401).end("Token expired");
    }

    // const value = decodeToken(token as string);
    // console.log("value", value);

    // const email = value?.user?.email;

    const user = await db("user").getByEmail(email);
    console.log(user);

    if (!user) {
      return res.status(401).end("User not found");
    }

    const result = await await signToken(user);

    if (!result?.access_token) {
      return res.status(401).end("Error logging in");
    }
    res.redirect("/jcadmin/overview");
  } catch (error) {
    console.error("JWT Verification Error:", error); 
    res.status(401).end("Invalid token");
  }
};

async function signToken(user: object): Promise<{ access_token: string }> {
  const payload = {
    user,
  };
  const secret = "wowthisisabadsecret12345"; //this.config.get('JWT_SECRET');

  try {
    const token = await jwt.sign(payload, secret, { expiresIn: "14mins" });
    return {
      access_token: token,
    };
  } catch (error) {
    console.log("error", error);
  }
  return { access_token: "" };
}

function decodeToken(token: string): any {
  try {
    const secret = "wowthisisabadsecret12345";
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    console.log("error", error);
    // Handle the error appropriately
    throw error;
  }
}

export default callbackHandler;
