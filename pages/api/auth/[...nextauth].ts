import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import User from "../../../lib/definitions/user";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        
        email: { label: "Email", type: "email", placeholder: "Email" },
      },
      authorize: async (credentials) => {
        const user = await User.findOne({
          where: { email: credentials?.email },
        });

        if (user) {
          return { id: user.id.toString(), name: user.name, email: user.email };
        } else {
          throw new Error("No user found");
        }
      },
    }),
    CredentialsProvider({
      name: "Magic Link",
      credentials: {
        token: { label: "Token", type: "text" }
      },
      authorize: async (credentials) => {
        const user = await verifyToken(credentials.token);
        if (user) {
          return user; // Return user object on successful verification
        } else {
          throw new Error('Invalid token'); // Throw error on failure
        }
      }
    }),
  ],
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session(session, token) {
      session.user.id = token.id;
      return session;
    }
  }
});
