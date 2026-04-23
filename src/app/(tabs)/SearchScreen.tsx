import { View, TextInput, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import SearchResultScreen from '@/components/SearchResultScreen';
import SearchEmptyScreen from '@/components/SearchEmptyScreen';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  let check = query.trim() === '';

  useEffect(() => {
    console.log('Search query:', query);
    console.log('Search query:', check);
  }, [query]);

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
          </View>
        </View>

        {query.trim() === '' ? (
          <SearchEmptyScreen />
        ) : (
          <SearchResultScreen />
        )}

      </ScrollView>

    </View>
  );
}