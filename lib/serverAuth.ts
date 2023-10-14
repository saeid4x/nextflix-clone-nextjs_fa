import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prismadb from '@/lib/prismadb';
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";


const serverAuth = async (req:NextApiRequest,res:NextApiResponse) => {
    const session = await getServerSession(req,res,authOptions);
    
    // console.log({session})
    /*
    session: {
        user: { name: 'test', email: 'test@gmail.com', image: '' },
        expires: '2023-11-11T13:37:43.075Z'
  }

    */

    if(!session?.user?.email){
        throw new Error('Not Signed in')
    }

    const currentUser = await prismadb.user.findUnique({
        where:{
            email: session.user.email
        }
    })

    if(!currentUser){
        throw new Error('user not found!')
    }

    

    return {currentUser}
}


export default serverAuth