import Header from '@/components/Header';
import SearchEmptyScreen from '@/components/SearchEmptyScreen';
import SearchResultScreen from '@/components/SearchResultScreen';
import { useBrowseSubjects } from '@/hooks/useBrowseSubjects';
import { useSearchBooks } from '@/hooks/useSearchBooks';
import { useSearchQuery } from '@/hooks/useSearchQuery';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { useRef, useState } from 'react';
import { MotiView } from 'moti';

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
  const inputRef = useRef<TextInput>(null);
  const scrollRef = useRef<ScrollView>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const {
    data: subjects,
    isLoading: loadingSubjects,
  } = useBrowseSubjects();

  return (
    <View className="flex-1 bg-gray-50 mt-12">

      {/* Header */}
      <Header />

      {/* Content */}
      <ScrollView
        ref={scrollRef}
        onScroll={(e) => {
          const offsetY = e.nativeEvent.contentOffset.y;
          setShowScrollTop(offsetY > 300);
        }}
        scrollEventThrottle={16}
        className="flex-1 px-5 pt-4"
      >

        {/* Search Input */}
        <View className="mb-4">
          <View className="relative">
            <Ionicons name="search" size={20} color="black" className="absolute left-0 top-3 text-gray-400" />

            <TextInput
              value={query}
              onChangeText={setQuery}
              ref={inputRef}
              placeholder="Search by title or author"
              className="border-b border-gray-800 pl-8 pb-2 text-lg"
            />

            {query.length > 0 && (
              <TouchableOpacity
                onPress={() => {
                  setQuery('');
                  inputRef.current?.focus();
                  scrollRef.current?.scrollTo({ y: 0, animated: false });
                }}
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

      {showScrollTop && (
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
        >
          <TouchableOpacity
            onPress={() =>
              scrollRef.current?.scrollTo({ y: 0, animated: true })
            }
            className="absolute bottom-6 right-6 bg-black p-3 rounded-full shadow-lg"
          >
            <Ionicons name="arrow-up" size={20} color="white" />
          </TouchableOpacity>
        </MotiView>
      )}

    </View>
  );
}