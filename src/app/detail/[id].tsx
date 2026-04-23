import Header from '@/components/Header';
import { api } from '@/services/api';
import { ENDPOINTS } from '@/services/endpoints';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DetailLayout() {
    const { id } = useLocalSearchParams();

    const [book, setBook] = useState<any>(null);
    const [bookDate, setBookDate] = useState("");
    const [bookCover, setBookCover] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getCoverUrl = (covers?: number[]) => {
        if (!covers || covers.length === 0) {
            return 'https://via.placeholder.com/300x450';
        }
        return `https://covers.openlibrary.org/b/id/${covers[0]}-M.jpg`;
    };

    const getDescription = (desc: any) => {
        if (!desc) return 'No description available';
        if (typeof desc === 'string') return desc;
        if (desc.value) return desc.value;
        return 'No description available';
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return 'Unknown';
        const date = new Date(dateStr);
        return isNaN(date.getTime()) ? 'Unknown' : date.toLocaleDateString();
    }

    const fetchDetail = async () => {
        try {
            setError(null);
            const res = await api.get(ENDPOINTS.workDetail(id as string));

            setBook(res.data);
            setBookDate(formatDate(res.data.created?.value));
            setBookCover(getCoverUrl(res.data?.covers));
            console.log('Book Detail:', res.data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch detail');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchDetail();
    }, [id]);

    return (
        <SafeAreaView className="flex-1 bg-gray-50 ">

            {/* Header */}
            <Header isDetail={true} />

            <ScrollView className="flex-1 px-4 py-6">

                {/* Cover */}
                <View className="items-center mb-6">
                    <View className="w-3/4">
                        <Image
                            source={{
                                uri: bookCover,
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
                        Eleanor Vance
                    </Text>
                    <Text className="text-sm text-gray-400">
                        First Published {bookDate || 'Unknown'}
                    </Text>
                </View>

                {/* Actions */}
                <View className="flex-row flex-wrap gap-3 mb-6 border-b border-gray-200 pb-4">
                    <TouchableOpacity className="bg-black px-4 py-2 rounded-full">
                        <Text className="text-white font-medium">
                            Add to Favorites
                        </Text>
                    </TouchableOpacity>

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
                        {book?.description ? getDescription(book.description) : 'No description available'}
                    </Text>
                </View>

                <View className="h-20" />

            </ScrollView>

        </SafeAreaView>
    );
}