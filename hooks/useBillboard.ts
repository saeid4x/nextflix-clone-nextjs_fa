import useSwr from 'swr';
import fetcher from '@/lib/fetcher';

const useBillboard = () => {
    const {data, error, isLoading} = useSwr('/api/random', fetcher);
    console.log('useBillboard[data]=',data)

    return {
        data, error, isLoading
    }
}

export default useBillboard;