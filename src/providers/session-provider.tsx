"use client";

import { SessionProvider as NextAuthProvider } from "next-auth/react";
import { ReactNode, Suspense } from "react";

export default function SessionProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <Suspense>
      <NextAuthProvider refetchOnWindowFocus={false}>
        {children}
      </NextAuthProvider>
    </Suspense>
  );
}
