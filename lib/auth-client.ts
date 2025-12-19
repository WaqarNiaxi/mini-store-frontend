// src/lib/auth-client.ts
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:4000", // backend URL
});

// Optional named exports (recommended)
export const { signIn, signUp, signOut, useSession } = authClient;
