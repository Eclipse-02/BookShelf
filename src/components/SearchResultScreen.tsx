import { View, Text, FlatList } from 'react-native'
import React from 'react'
import BookCard from '@/components/BookCard';
import BookListSkeleton from '@/components/BookListSkeleton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';

type Props = {
    books: any[];
    total: number;
    loading: boolean;
    onLoadMore: () => void;
    hasNextPage?: boolean;
    isFetchingMore: boolean;
};

export default function SearchResultScreen({
    books,
    total,
    loading,
    onLoadMore,
    hasNextPage,
    isFetchingMore,
}: Props) {
    if (!loading && books.length === 0) {
        return (
            <View className="flex-1 justify-center items-center mt-10">
                <Ionicons name="search" size={48} color="#999" />
                <Text className="text-gray-500 mt-4">No results found for</Text>
            </View>
        );
    }

    const renderItem = ({ item }: any) => {
        const id = item.key?.replace('/works/', '');

        return (
            <View className="w-[48%] mb-4">
                <BookCard
                    title={item.title}
                    author={item.author_name?.[0]}
                    coverId={item.cover_i}
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
        <View>
            {/* Results Header */}
            <View className="flex-row justify-between items-end mb-4">
                <Text className="text-lg font-semibold">Results</Text>
                {loading ? (
                    <Text className="text-sm text-gray-500">Loading...</Text>
                ) : (
                    <Text className="text-sm text-gray-500">{total} found</Text>
                )}
            </View>

            {/* Results Grid */}
            <View className="flex-row flex-wrap justify-between">

                {/* Card */}
                {loading ? (
                    <BookListSkeleton count={6} numColumns={2} />
                ) : (
                    <FlatList
                        data={books}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.key}
                        numColumns={2}
                        columnWrapperStyle={{
                            justifyContent: 'space-between',
                        }}
                        style={{
                            marginBottom: 40
                        }}
                        scrollEnabled={false}
                        onEndReached={() => {
                            if (hasNextPage && !isFetchingMore) {
                                onLoadMore();
                            }
                        }}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={
                            isFetchingMore ? (
                                <BookListSkeleton count={2} numColumns={2} />
                            ) : null
                        }
                    />
                )}

            </View>
        </View>
    )
}