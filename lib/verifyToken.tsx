import jwt from "jwt-simple";
import findUserByEmail from "./findUserByEmail";

//const SECRET_KEY = process.env.SECRET_KEY;
const SECRET_KEY = "secret";

export async function verifyToken(token: string) {
  try {
    const { email, exp } = jwt.decode(token, SECRET_KEY);
    if (Date.now() > exp) {
      return null; // Token expired
    }
    const user = await findUserByEmail(email);
    return user; // Return the user if found
  } catch (error) {
    return null; // Token invalid or other error
  }
}
