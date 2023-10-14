import bcrypt from 'bcrypt'
import {NextApiRequest, NextApiResponse} from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    if(req.method !== 'POST'){
        /*
          405 Method Not Allowed error:            
            It's an HTTP response status code that indicates that the 
            request method is known by the server but is not supported by
            the target resource
        */
        return res.status(405).end()
    }

    try{
        const {name, email, password} = req.body;
        const existingUser = await prismadb.user.findUnique({
            where:{
                email
            }
        });

        if(existingUser){

            /*
             Error 422:
               is an HTTP code that tells you that the server can't process your request,
               although it understands it. The full name of the error code is 422 “unprocessable entity.” 
               In a nutshell, the error  means that you're making a request the server understands, but it
               can't process it.
            */
            return res.status(422).json({error:'Email taken'})
        }

        const hashedPassword = await bcrypt.hash(password,12);

        const user = await prismadb.user.create({
            data:{
                email, name, hashedPassword, image:'', emailVerified: new Date()
            }
        });

        return res.status(200).json(user)

    } catch(error){
        console.log('Error(register api):',error);

        /*
        “400 Bad Request” : 
          is a general error that indicates that your browser sends a request to the
           website's server and the server can't process or recognize the request.
        */
        return res.status(400).end()
    }
}