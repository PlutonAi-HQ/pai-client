import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  TWITTER_CLIENT_ID,
  TWITTER_CLIENT_SECRET,
} from "@/configs/env.config";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
    }),
    TwitterProvider({
      clientId: TWITTER_CLIENT_ID!,
      clientSecret: TWITTER_CLIENT_SECRET!,
    }),
  ],
};

export default NextAuth(authOptions);
