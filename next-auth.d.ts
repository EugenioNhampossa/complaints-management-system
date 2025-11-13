/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth/next";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      type: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    type: string;
  }

  interface JWT {
    id: string;
    email: string;
    name: string;
    type: string;
  }
}
