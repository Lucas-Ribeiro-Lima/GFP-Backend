import { ContaProps } from "@/entities/Conta.ts";

declare module "express-session" {
  interface SessionData {
    passport: {
      user: {
        id: number,
        email: string,
        idCarteira?: number
      }
    }
  }
}

declare module "express-serve-static-core" {
  interface Request {
    user?: ContaProps & {
      idCarteira?: number
    };
  }
}