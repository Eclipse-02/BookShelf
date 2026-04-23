import { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { api } from '@/services/api';
import { ENDPOINTS } from '@/services/endpoints';
import BookCard from '@/components/BookCard';
import { router } from 'expo-router';
import Header from '@/components/Header';
import { MaterialIcons } from "@expo/vector-icons";

export default function HomeScreen() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBooks = async () => {
    try {
      setError(null);
      const res = await api.get(ENDPOINTS.trending);
      setBooks(res.data.works || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch books');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchBooks();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
        <Text className="mt-2 text-gray-600">Loading books...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center px-4">
        <Text className="text-red-500 text-center">{error}</Text>
        <TouchableOpacity onPress={fetchBooks}>
          <Text className="mt-3 text-blue-500">Tap to retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50 mt-12">

      {/* Header */}
      <Header />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16, paddingVertical: 16, paddingBottom: 80 }}
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

            {/* Card */}
            {books.map((item) => (
              <BookCard
                key={item.key}
                title={item.title}
                author={item.authors?.[0]?.name}
                onPress={() => {
                  console.log('ID:', item.key);
                  router.push({
                    pathname: `/detail/[id]`,
                    params: { id: item.key?.replace('/works/', '') },
                  })
                }}
              />
            ))}
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