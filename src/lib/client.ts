import { PrismaClient } from "@prisma/client";

const prismeClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismeGlobal: ReturnType<typeof prismeClientSingleton>;
} & typeof global;

const prisma = globalThis.prismeGlobal ?? prismeClientSingleton();

const db = prisma;

export default db;

if (process.env.NODE_ENV !== "production") globalThis.prismeGlobal = db;
