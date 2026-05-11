import { useQuery } from 'react-query';
import { getMyStores } from '../api/StoreApiService';

export const useMyStores = () => {
    return useQuery(['myStores'], async () => {
        const response = await getMyStores();
        return response?.data?.result || [];
    }, {
        staleTime: 5 * 60 * 1000,
        retry: false,
    });
};
