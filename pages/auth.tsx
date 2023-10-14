import Input from "@/components/Input"
import axios from "axios";
import { useCallback, useState } from "react";
import {signIn} from 'next-auth/react';
 
import {FcGoogle} from 'react-icons/fc';
import {FaGithub} from 'react-icons/fa'
import { useRouter } from "next/router";


const Auth = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [variant, setVariant] = useState('login');
    const router = useRouter()

    
    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
    } , [])


    const login = useCallback(async () => {
        try{
            /* 
              `credentials` in signIn('credentials') comes from 
              value of `id` property in following code on [...nextauth].ts file.

            providers: [
              Credentials({
                id:'credentials', <----
                name:'Credentials',
                ....
            */
          await  signIn('credentials',{
                email, password,callbackUrl:'/profile'
            });

             
        }catch(error) {
            console.log(error)
        }
    } , [email, password])

    
    const register = useCallback(async () => {
        try{
            await axios.post('/api/register' , {
                email, name, password
            })

        } catch(error) {
            console.log(error)
        }

        login()
    } , [email, name, password,login]);

   

    
    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-5" >
                    <img src="/images/logo.png" alt="logo" className="h-12"/>
                </nav>

                <div className="flex justify-center ">
                    <div  
                       className="bg-black bg-opacity-70 px-16 py-5 self-center mt-1
                                  lg:w-2/5 lg:max-w-md rounded-md w-full"  
                    >

                        <h2 className="text-white text-4xl mb-8 font-semibold txt-rtl">
                            {variant === 'login' ? 'ورود به سایت ' : 'عضویت'}
                        </h2>


                        <div className="flex flex-col gap-4">

                            {variant === 'register' && (
                                <Input 
                                  label="Username"
                                  onChange={(event:any) => setName(event.target.value)}
                                  id="name"                           
                                  value={name}
                                />
                            )}


                            <Input 
                              label="Email"
                              onChange={(event:any) => setEmail(event.target.value)}
                              id="email"
                              type="email"
                              value={email}
                            />

                            <Input 
                              label="Password"
                              onChange={(event:any) => setPassword(event.target.value)}
                              id="password"
                              type="password"
                              value={password}
                            />

                        </div>
                        
                        <button 
                           onClick={variant === 'login' ? login : register}
                           className="bg-red-600 py-3 text-white rounded-md w-full mt-10
                                             hover:bg-red-700 transition ">

                            {variant === 'login' ? 'ورود به سایت' : 'عضویت'}
                        </button>

                        {/* social auth button */}
                        <div className="flex flex-row items-center gap-4 mt-8 justify-center">

                            <div 
                                onClick={() => signIn('google',{callbackUrl:'/profile'})}
                                className="w-10 h-10 bg-white rounded-full flex
                                            items-center justify-center cursor-pointer 
                                            hover:opacity-80 transition  " >
                                <FcGoogle size={30}/>


                            </div>

                            <div 
                                onClick={() => signIn('github' , {callbackUrl:'/profile'})}
                                className="w-10 h-10 bg-white rounded-full flex
                                            items-center justify-center cursor-pointer 
                                            hover:opacity-80 transition  " >
                                <FaGithub size={30}/>


                            </div>

                        </div>

                        <p className="text-neutral-500 mt-12 txt-rtl">
                            {variant ==='login' ? ' حساب کاربری ندارید?' : 'حساب کاربری دارید?'} 
                            &nbsp;  &nbsp;                         
                            <span
                              onClick={toggleVariant}
                              className="text-white ml-1 hover:underline cursor-pointer">
                               {variant === 'login' ? 'ثبت نام کنید' : "لاگین کنید"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
 
        </div>
    )
}

export default Auth