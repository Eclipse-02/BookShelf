import Header from "@/components/Header";
import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useBookmarks } from "@/hooks/useBookmarks";
import BookListSkeleton from "@/components/BookListSkeleton";
import { router } from 'expo-router';
import BookCard from "@/components/BookCard";

export default function BookmarksScreen() {
  const { bookmarks, hydrated } = useBookmarks();

  const books = Object.values(bookmarks);
  console.log('Books:', books);

  if (!hydrated) {
    return <BookListSkeleton count={6} horizontal={false} numColumns={2} />;
  }

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
      <ScrollView className="flex-1 pt-4">

        <View className="px-4 pt-4">
          <Text className="text-2xl font-semibold text-gray-900">
            Your Bookmarks
          </Text>
          <Text className="text-gray-500 mt-2">
            A curated collection of your most cherished reads.
          </Text>

          {/* Filters */}
          <View className="flex-row gap-2 mt-4">
            <TouchableOpacity className="px-4 py-2 rounded-full bg-gray-900">
              <Text className="text-white text-xs font-semibold">
                All Saved
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="px-4 py-2 rounded-full bg-gray-200">
              <Text className="text-xs">Fiction</Text>
            </TouchableOpacity>

            <TouchableOpacity className="px-4 py-2 rounded-full bg-gray-200">
              <Text className="text-xs">Design</Text>
            </TouchableOpacity>
          </View>

          {/* Grid */}
          {!hydrated ? (
            <BookListSkeleton count={6} horizontal={false} numColumns={2} />
          ) : books.length === 0 ? (
            <View className="flex-1 justify-center items-center mt-10">
              <Ionicons name="bookmark-outline" size={48} color="#999" />
              <Text className="text-gray-500 mt-4">No bookmarks yet</Text>
            </View>
          ) : (
            <FlatList
              data={books}
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

      </ScrollView>

    </View>
  );
}