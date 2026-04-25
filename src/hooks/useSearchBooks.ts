import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { ENDPOINTS } from '@/services/endpoints';

export function useSearchBooks(query: string, enabled: boolean) {
    return useInfiniteQuery({
        queryKey: ['search-books', query],
        staleTime: 1000 * 60 * 5,
        queryFn: async ({ pageParam = 1 }) => {
            const res = await api.get(ENDPOINTS.search(query, pageParam, 20));

            return {
                books: res.data.docs,
                total: res.data.numFound,
                page: pageParam,
            };
        },

        initialPageParam: 1,

        getNextPageParam: (lastPage, allPages) => {
            const loaded = allPages.reduce(
                (acc, page) => acc + page.books.length,
                0
            );

            if (loaded < lastPage.total) {
                return lastPage.page + 1;
            }

            return undefined;
        },

        enabled,
    });
}