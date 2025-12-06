// import { PrismaClient } from "./generated/prisma/client";
// import { PrismaNeon } from "@prisma/adapter-neon";
//
// const adapter = new PrismaNeon({
//   connectionString: process.env.DATABASE_URL
// });
//
// const prismaClientSingleton = () => {
//   return new PrismaClient({ adapter }).$extends({
//     result: {
//       product: {
//         price: {
//           needs: { price: true },
//           compute(product) {
//             return product.price.toString();
//           },
//         },
//         rating: {
//           needs: { rating: true },
//           compute(product) {
//             return product.rating.toString();
//           },
//         },
//       },
//     },
//   });
// };
//
// declare global {
//   var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
// }
//
// const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
//
// export default prisma;
//
// if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
//
import { neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from './generated/prisma/client';
import ws from 'ws';
// Configure WebSocket for Neon (required for Node.js v21 and earlier)
// This enables transaction and session support via WebSocket connections
neonConfig.webSocketConstructor = ws;
const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL;

  const adapter = new PrismaNeon({ connectionString });
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  }).$extends({
    result: {
      product: {
        price: {
          needs: { price: true },
          compute(product) {
            return product.price.toString();
          },
        },
        rating: {
          needs: { rating: true },
          compute(product) {
            return product.rating.toString();
          },
        },
      },
    },
  });
};
// Declare global type for singleton
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;
// Use singleton pattern to prevent multiple instances during hot-reloading
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
export default prisma;
// Store in global only in development to survive Next.js hot reloads
if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}
