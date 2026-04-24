import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import BookmarkButton from '@/components/BookmarkButton';
import Header from '@/components/Header';
import DetailSkeleton from '@/components/DetailSkeleton';
import { useBookDetail } from '@/hooks/useBookDetails';
import { useBookmarks } from '@/hooks/useBookmarks';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

export default function DetailLayout() {
    const { id } = useLocalSearchParams();
    const {
        book,
        author,
        coverUrl,
        releaseDate,
        isLoading,
    } = useBookDetail(id as string);
    const { hydrated } = useBookmarks();

    const isLoaded = hydrated && !isLoading;

    if (!isLoaded) {
        return <DetailSkeleton />;
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50">

            {/* Header */}
            <Header isDetail={true} />

            <ScrollView className="flex-1 px-4 py-6">

                {/* Cover */}
                <View className="items-center mb-6">
                    <View className="w-3/4">
                        <Image
                            source={{
                                uri: coverUrl,
                            }}
                            className="w-full h-[400px] rounded-lg"
                            resizeMode="cover"
                        />
                    </View>
                </View>

                {/* Title & Meta */}
                <View className="mb-6">
                    <Text className="text-2xl font-bold mb-1">
                        {book?.title}
                    </Text>
                    <Text className="text-lg text-gray-600 mb-2">
                        {author?.name || 'Unknown Author'}
                    </Text>
                    <Text className="text-sm text-gray-400">
                        First Published: {releaseDate || 'Unknown'}
                    </Text>
                </View>

                {/* Actions */}
                <View className="flex-row flex-wrap gap-3 mb-6 border-b border-gray-200 pb-4">
                    <BookmarkButton
                        book={{
                            key: `/works/${id}`,
                            title: book?.title,
                            author: author?.name,
                            covers: book?.covers,
                        }}
                    />

                    <TouchableOpacity className="bg-gray-200 px-4 py-2 rounded-full">
                        <Text className="text-black">
                            Read Sample
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Synopsis */}
                <View>
                    <Text className="text-sm font-semibold uppercase tracking-wider mb-3">
                        Synopsis
                    </Text>

                    <Text className="text-gray-700 mb-3 leading-relaxed">
                        {book?.description ? book.description : 'No description available'}
                    </Text>
                </View>

                <View className="h-20" />

            </ScrollView>

        </SafeAreaView>
    );
}