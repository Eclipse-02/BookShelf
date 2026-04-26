import Header from "@/components/Header";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useBookmarks } from "@/hooks/useBookmarks";
import BookListSkeleton from "@/components/BookListSkeleton";
import { router } from 'expo-router';
import BookCard from "@/components/BookCard";
import { SUBJECT_MAP } from "@/constants/subjectMap";
import { MotiView } from "moti";

const FILTERS = ['All', ...Object.keys(SUBJECT_MAP)];

export default function BookmarksScreen() {
  const { bookmarks, hydrated } = useBookmarks();

  const books = Object.values(bookmarks);

  if (!hydrated) {
    return <BookListSkeleton count={6} horizontal={false} numColumns={2} />;
  }

  const [activeFilter, setActiveFilter] = useState('All');
  const scrollRef = useRef<ScrollView>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const filteredBooks =
    activeFilter === 'All'
      ? books
      : books.filter((book) =>
        book.categories?.includes(activeFilter)
      );

  const renderItem = ({ item }: any) => {
    const id = item.key.replace('/works/', '');

    return (
      <View className="mb-4">
        <BookCard
          title={item.title}
          author={item.author}
          coverId={item.covers?.find((c: number) => c > 0)}
          onPress={() =>
            router.push({
              pathname: '/detail/[id]',
              params: { id },
            })
          }
        />
      </View>
    );
  };

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
        className="flex-1 pt-4"
      >

        <View className="px-4 pt-4">
          <Text className="text-2xl font-semibold text-gray-900">
            Your Bookmarks
          </Text>
          <Text className="text-gray-500 mt-2">
            A curated collection of your most cherished reads.
          </Text>

          {/* Filters */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-2 mt-4">
              {FILTERS.map((filter) => {
                const isActive = activeFilter === filter;

                return (
                  <TouchableOpacity
                    key={filter}
                    onPress={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-full ${isActive ? 'bg-gray-900' : 'bg-gray-200'}`}
                  >
                    <Text
                      className={`text-xs ${isActive ? 'text-white font-semibold' : 'text-black'}`}
                    >
                      {filter}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

          {/* Grid */}
          {!hydrated ? (
            <BookListSkeleton count={6} horizontal={false} numColumns={2} />
          ) : books.length === 0 ? (
            <View className="flex-1 justify-center items-center mt-10">
              <Ionicons name="bookmark-outline" size={48} color="#999" />
              <Text className="text-gray-500 mt-4">No bookmarks yet</Text>
            </View>
          ) : filteredBooks.length === 0 ? (
            <View className="flex-1 justify-center items-center mt-10">
              <Ionicons name="bookmark-outline" size={48} color="#999" />
              <Text className="text-gray-500 mt-4">No books in "{activeFilter}"</Text>
            </View>
          ) : (
            <FlatList
              data={filteredBooks}
              renderItem={renderItem}
              keyExtractor={(item) => item.key}
              numColumns={2}
              initialNumToRender={6}
              columnWrapperStyle={{
                justifyContent: 'space-between',
              }}
              scrollEnabled={false}
              className="mt-5"
            />
          )}
        </View>

        <View className="h-20" />

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

      </ScrollView>

    </View>
  );
}