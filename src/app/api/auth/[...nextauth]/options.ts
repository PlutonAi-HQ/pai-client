import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SERVER_URL,
  TWITTER_CLIENT_ID,
  TWITTER_CLIENT_SECRET,
} from "@/configs/env.config";
import { NextAuthOptions } from "next-auth";
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
      version: "2.0",
    }),
  ],
  callbacks: {
    async signIn() {
      const response = await fetch(`${SERVER_URL}/wallet/generate`, {
        method: "POST",
        headers: {
          accept: "application/json",
        },
      });
      if (!response.ok) {
        throw Error("Failed to create wallet");
      }

      const walletData = await response.json();
      console.log(walletData);
      return true;
    },
  },
};
