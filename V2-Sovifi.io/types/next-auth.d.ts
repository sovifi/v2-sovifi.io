import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      address: string;
      chainId: number;
    } & DefaultSession["user"];
  }

  interface User {
    address: string;
    chainId: number;
  }
}