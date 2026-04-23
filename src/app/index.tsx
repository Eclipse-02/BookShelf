import { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { api } from '@/services/api';
import { ENDPOINTS } from '@/services/endpoints';
import BookCard from '@/components/BookCard';
import { router } from 'expo-router';

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
    <FlatList
      data={books}
      keyExtractor={(item) => item.key}
      contentContainerStyle={{ padding: 12 }}
      renderItem={({ item }) => {
        const id = item.key?.replace('/works/', '');

        return (
          <BookCard
            title={item.title}
            author={item.authors?.[0]?.name}
            coverId={item.cover_id}
            onPress={() => router.push(`/detail/${id}`)}
          />
        );
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
}