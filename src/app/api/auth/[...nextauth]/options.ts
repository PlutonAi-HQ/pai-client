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

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    wallet?: {
      public_key?: string;
    };
  }
}

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
    async session({ session }) {
      const response = await fetch(`${SERVER_URL}/callback/social`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          username: session?.user?.name,
          email: session?.user?.email,
          avatar: session?.user?.image,
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch social account");

      const userData = await response.json();
      session.accessToken = userData.access_token;
      session.wallet = session.wallet || {};
      session.wallet.public_key = userData.wallet.public_key;
      return session;
    },
  },
};
