import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyToken } from "../../../lib/verifyToken";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Magic Link",
      credentials: {
        token: { label: "Token", type: "string" }
      },
      authorize: async (credentials) => {
        const user = await verifyToken(credentials?.token ?? '');
        if (user) {
          return { ...user, id: user.id.toString() }; // Convert id to string
        } else {
          throw new Error('Invalid token'); // Throw error on failure
        }
      }
    }),
  ],
  callbacks: {
    async jwt(params: { token: any; user: any }) {
      const { token, user } = params;
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session(params: { session: any; token: any; trigger: "update" | "signout" }) {
      const { session, token } = params;
      session.user.id = token.id;
      return session;
    }
  }
});
