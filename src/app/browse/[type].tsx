import Header from '@/components/Header';
import BookCard from '@/components/BookCard';
import { useBrowseBooks } from '@/hooks/useBrowseBooks';
import { useLocalSearchParams, router } from 'expo-router';
import { FlatList, Text, View } from 'react-native';
import BookListSkeleton from '@/components/BookListSkeleton';

export default function BrowseScreen() {
    const { type, subject } = useLocalSearchParams<{
        type: 'trending' | 'subject';
        subject?: string;
    }>();

    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useBrowseBooks({
        type,
        subject,
    });
    const books = data?.pages.flatMap((p) => p.books) ?? [];

    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    const title =
        type === 'trending'
            ? 'Trending Books'
            : `Category: ${capitalize(subject || '')}`;

    const renderItem = ({ item }: any) => {
        const id = item.key?.replace('/works/', '');

        return (
            <View className="w-[48%] mb-4">
                <BookCard
                    title={item.title}
                    author={item.authors?.[0]?.name || item.author_name?.[0]}
                    coverId={
                        item.cover_id ||
                        item.cover_i ||
                        item.covers?.find((c: number) => c > 0)
                    }
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
            <Header isDetail />

            {/* Content */}
            <View className="px-4 pt-4">
                <Text className="text-2xl font-semibold mb-4">
                    {title}
                </Text>

                {isLoading ? (
                    <BookListSkeleton count={6} horizontal={false} numColumns={2} />
                ) : (
                    <FlatList
                        data={books}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => {
                            const cleanKey = item.key?.replace('/works/', '') || '';
                            return `${cleanKey}-${index}`;
                        }}
                        numColumns={2}
                        columnWrapperStyle={{
                            justifyContent: 'space-between',
                        }}
                        style={{
                            marginBottom: 120
                        }}
                        onEndReached={() => {
                            if (hasNextPage && !isFetchingNextPage) {
                                fetchNextPage();
                            }
                        }}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={
                            isFetchingNextPage ? (
                                <BookListSkeleton count={2} horizontal={false} numColumns={2} />
                            ) : null
                        }
                    />
                )}
            </View>

        </View>
    );
}