import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "@/models/userModel";
import { connectDB } from "@/utils/connect";

async function login(credentials) {
  connectDB();
  const user = await User.findOne({ email: credentials.email });
  if (!user) throw new Error("Wrong credentials.");
  const isCorrect = await bcrypt.compare(credentials.password, user.password);
  if (!isCorrect) throw new Error("Wrong credentials.");
  return user;
}

export const authOptions = {
  pages: {
    signIn: "/signin",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const user = await login(credentials);
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.email = token.email;
        session.user.id = token.id;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
