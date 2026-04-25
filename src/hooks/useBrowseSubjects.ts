import { useQueries } from '@tanstack/react-query';
import { api } from '@/services/api';
import { ENDPOINTS } from '@/services/endpoints';

const SUBJECTS = ['Fiction', 'Science', 'History', 'Philosophy', 'Art'];

export function useBrowseSubjects() {
    const queries = useQueries({
        queries: SUBJECTS.map((subject) => ({
            queryKey: ['subject', subject],
            staleTime: 1000 * 60 * 5,
            queryFn: async () => {
                const res = await api.get(ENDPOINTS.subjectDetail(subject, 6));
                return {
                    subject,
                    books: res.data.works,
                };
            },
        })),
    });

    return {
        data: queries.map((q) => q.data).filter(Boolean),
        isLoading: queries.some((q) => q.isLoading),
    };
}