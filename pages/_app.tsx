import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import localFont from 'next/font/local'



const iranSans = localFont({
  src:'../public/fonts/IRANSans_Medium/IRANSans_Medium.ttf',
  variable: '--font-iranSans',
  display:'swap'
})



export default function App({ Component, pageProps }: AppProps) {
  return(<>
    <main className={iranSans.className}>

    <Component {...pageProps} className={iranSans.className}/>
    </main>
   
  </>)
}
