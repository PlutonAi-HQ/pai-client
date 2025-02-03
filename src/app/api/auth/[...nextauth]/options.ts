import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SERVER_URL,
  TWITTER_CLIENT_ID,
  TWITTER_CLIENT_SECRET,
} from "@/configs/env.config";
import { splitURL } from "@/utils";
import { getServerSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    referral: {
      code: string;
      total_used: number;
    };
    wallet: {
      public_key: string;
    };
  }
}

interface UserData {
  referral: { code: string; total_used: number };
  access_token: string;
  wallet: { public_key: string };
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
    async redirect({ url }) {
      const { searchParams } = splitURL(url);
      if (!searchParams.ref) return url;
      const session = await getServerSession();
      if (!session) return url;
      try {
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
            ref_code: searchParams.ref,
          }),
        });

        if (!response.ok) {
          console.error("API Error: ", response.status, await response.text());
          throw new Error("Unable to fetch social account data.");
        }

        const userData: UserData = await response.json();
        session.referral = userData.referral;
        session.accessToken = userData.access_token;
        session.wallet = userData.wallet;
      } catch (error) {
        console.error("Session Callback Error: ", error);
      }
      return url;
    },
    async session({ session }) {
      try {
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

        if (!response.ok) {
          console.error("API Error: ", response.status, await response.text());
          throw new Error("Unable to fetch social account data.");
        }

        const userData: UserData = await response.json();
        session.referral = userData.referral;
        session.accessToken = userData.access_token;
        session.wallet = userData.wallet;
      } catch (error) {
        console.error("Session Callback Error: ", error);
      }
      return session;
    },
  },
};
