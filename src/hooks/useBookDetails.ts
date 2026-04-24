import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { ENDPOINTS } from '@/services/endpoints';

function getValidCoverId(covers?: number[]) {
    if (!covers) return null;
    return covers.find((id) => id > 0) ?? null;
}

function getCoverUrl(covers?: number[]) {
    const id = getValidCoverId(covers);
    return id
        ? `https://covers.openlibrary.org/b/id/${id}-M.jpg`
        : 'https://via.placeholder.com/300x450';
}

function formatReleaseDate(dateStr?: string) {
    if (!dateStr) return 'Unknown';

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return 'Unknown';

    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

export function useBookDetail(id?: string) {
    const bookQuery = useQuery({
        queryKey: ['bookDetail', id],
        queryFn: async () => {
            const res = await api.get(ENDPOINTS.workDetail(id as string));
            return res.data;
        },
        enabled: !!id,
    });

    const authorKey = bookQuery.data?.authors?.[0]?.author?.key;
    const authorId = authorKey?.replace('/authors/', '');

    const authorQuery = useQuery({
        queryKey: ['authorDetail', authorId],
        queryFn: async () => {
            const res = await api.get(ENDPOINTS.author(authorId as string));
            return res.data;
        },
        enabled: !!authorId,
    });

    const isLoading =
        bookQuery.isLoading ||
        (authorId && authorQuery.isLoading);

    return {
        book: bookQuery.data,
        author: authorQuery.data,
        coverUrl: getCoverUrl(bookQuery.data?.covers),
        releaseDate: formatReleaseDate(
            bookQuery.data?.created?.value
        ),
        isLoading: isLoading,
        isError: bookQuery.isError,
        refetch: bookQuery.refetch,
    };
}