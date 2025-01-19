"use client";

import { SessionProvider as NextAuthProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function SessionProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <NextAuthProvider>{children}</NextAuthProvider>;
}
