import { PrismaClient } from "@prisma/client";

/* for prevent encounter with following error, we should save
   current instance of PrismaClient (=== prismadb) to `global.d.ts` file (in root of project).
    `global.d.ts` file not affected  by nextjs-hot-reloading.:

    warn(prisma-client) Already 10 prisma Client are actively running

*/
const client = global.prismadb || new PrismaClient();
if(process.env.NODE_ENV === 'production')
{
    global.prismadb=client;
}

export default client