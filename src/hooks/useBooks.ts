import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { ENDPOINTS } from '@/services/endpoints';

type Work = {
    key: string;
    title: string;
    author_name: string[];
    cover_i?: number;
};

type Response = {
    works: Work[];
};

const PREVIEW_LIMIT = 6;

export function useBooks() {
    const query = useQuery({
        queryKey: ['homeBooks'],
        queryFn: async () => {
            const res = await api.get<Response>(ENDPOINTS.trending(1));
            return res.data.works || [];
        },
    });

    const allBooks: Work[] = query.data ?? [];
    const previewBooks = allBooks.slice(0, PREVIEW_LIMIT);

    return {
        ...query,
        allBooks,
        previewBooks,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        isRefetching: query.isRefetching,
        refetch: query.refetch,
        isEmpty: allBooks.length === 0,
    };
}