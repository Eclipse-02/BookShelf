import Header from '@/components/Header';
import SearchEmptyScreen from '@/components/SearchEmptyScreen';
import SearchResultScreen from '@/components/SearchResultScreen';
import { useBrowseSubjects } from '@/hooks/useBrowseSubjects';
import { useSearchBooks } from '@/hooks/useSearchBooks';
import { useSearchQuery } from '@/hooks/useSearchQuery';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native';

export default function SearchScreen() {
  const {
    query,
    setQuery,
    debouncedQuery,
    isSearching
  } = useSearchQuery();

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSearchBooks(debouncedQuery, isSearching);

  const books = data?.pages.flatMap((page) => page.books) ?? [];

  const total = data?.pages?.[0]?.total ?? 0;

  const {
    data: subjects,
    isLoading: loadingSubjects,
  } = useBrowseSubjects();

  return (
    <View className="flex-1 bg-gray-50 mt-12">

      {/* Header */}
      <Header />

      {/* Content */}
      <ScrollView className="flex-1 px-5 pt-4">

        {/* Search Input */}
        <View className="mb-4">
          <View className="relative">
            <Ionicons name="search" size={20} color="black" className="absolute left-0 top-3 text-gray-400" />

            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search by title or author"
              className="border-b border-gray-800 pl-8 pb-2 text-lg"
            />

            {query.length > 0 && (
              <TouchableOpacity
                onPress={() => setQuery('')}
                className="absolute right-0 top-3"
              >
                <Ionicons name="close-circle" size={20} color="gray" />
              </TouchableOpacity>
            )}

          </View>
        </View>

        {/* Main Content */}
        {!isSearching ? (
          <SearchEmptyScreen
            data={subjects}
            loading={loadingSubjects}
          />
        ) : (
          <SearchResultScreen
            books={books}
            total={total}
            loading={isLoading}
            onLoadMore={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingMore={isFetchingNextPage}
          />
        )}

      </ScrollView>

    </View>
  );
}