import BookCard from '@/components/BookCard';
import BookCardSkeleton from '@/components/BookCardSkeleton';
import Header from '@/components/Header';
import { useBooks } from '@/hooks/useBooks';
import { MaterialIcons } from "@expo/vector-icons";
import { router } from 'expo-router';
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function HomeScreen() {
  const {
    previewBooks,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useBooks();

  return (
    <View className="flex-1 bg-gray-50 mt-12">

      {/* Header */}
      <Header />

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        className="flex-1 px-5 pt-4"
      >

        {/* Trending Section */}
        <View className="mb-8">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-semibold">Trending Books</Text>
            <TouchableOpacity className="flex-row items-center gap-1">
              <Text className="text-blue-500">View all</Text>
              <MaterialIcons name="arrow-forward" size={18} color="blue" />
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>

            {/* Error Message */}
            {isError &&
              <View className="flex-1 w-[90vw] justify-center items-center px-4">
                <Text className="text-red-500 text-center">{(error as Error).message || 'An error occurred'}</Text>
                <TouchableOpacity onPress={() => refetch()}>
                  <Text className="mt-3 text-blue-500">Tap to retry</Text>
                </TouchableOpacity>
              </View>
            }

            {/* Skeleton Loader */}
            {isLoading ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {[...Array(6)].map((_, i) => (
                  <BookCardSkeleton key={i} />
                ))}
              </ScrollView>
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {/* Card */}
                {previewBooks.map((item) => (
                  <BookCard
                    key={item.key}
                    title={item.title}
                    author={item.author_name?.[0]}
                    coverId={item.cover_i}
                    onPress={() => {
                      router.push({
                        pathname: `/detail/[id]`,
                        params: { id: item.key?.replace('/works/', '') },
                      })
                    }}
                  />
                ))}
              </ScrollView>
            )}

          </ScrollView>
        </View>

        {/* Subjects Section */}
        <View className="mb-8">
          <Text className="text-lg font-semibold mb-4">
            Popular Subjects
          </Text>

          <View className="flex-row flex-wrap justify-between">

            {[
              'Fiction',
              'Science',
              'History',
              'Philosophy',
              'Biography',
              'Art',
              'Technology',
            ].map((subject, index) => (
              <TouchableOpacity
                key={index}
                className="w-[48%] h-32 mb-4 bg-gray-100 rounded-xl justify-center items-center"
              >
                <Text className="text-base font-medium">
                  {subject}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      </ScrollView>

    </View>
  );
}