import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { ENDPOINTS } from '@/services/endpoints';

type Props = {
  type: 'trending' | 'subject';
  subject?: string;
};

export function useBrowseBooks({ type, subject }: Props) {
  return useInfiniteQuery({
    queryKey: ['browse-books', type, subject],
    queryFn: async ({ pageParam = 1 }) => {
      let url = '';

      if (type === 'trending') {
        url = ENDPOINTS.trending(pageParam);
      }

      if (type === 'subject' && subject) {
        url = ENDPOINTS.subjectDetail(subject, pageParam);
      }

      const res = await api.get(url);

      return {
        books: res.data.works || res.data.docs || [],
        total: res.data.work_count || res.data.numFound || 0,
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
  });
}