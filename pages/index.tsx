import Image from 'next/image'
import { Inter } from 'next/font/google'
import {getSession} from 'next-auth/react';
import { NextPageContext } from 'next';
import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import InfoModal from '@/components/InfoModal';
import useInfoModal from '@/hooks/useInfoModal';
 

// const inter = Inter({ subsets: ['latin'] })

// protext route from unauthorized users 
export async function getServerSideProps(context:NextPageContext){
 
  const session = await getSession(context);
  // console.log({session})

  if(!session){
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  return {
    props:{}
  }
}


export default   function Home() {
    const {data: movies = []} = useMovieList();
    const {data:favorites = []} = useFavorites();
    const {isOpen, closeModal} = useInfoModal();

  return (
     <>
       <InfoModal visible={isOpen} onClose={closeModal} />
       <Navbar />
       <Billboard />   

       <div className='pb-40'>
         <MovieList title='فیلم های ترند شده' data={movies}/>
         <MovieList title='لیست من' data={favorites}/>
       </div>
        
     </>
  )
}
