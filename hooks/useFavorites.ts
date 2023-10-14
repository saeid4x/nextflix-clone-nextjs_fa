import useSwr from 'swr';
import fetcher from '@/lib/fetcher';

const useFavorites = () => {
    const {data, error, isLoading, mutate} = useSwr('/api/favorites', fetcher);

    return {
        data, error, isLoading, mutate
    }
}

export default useFavorites;