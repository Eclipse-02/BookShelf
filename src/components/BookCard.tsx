import { View, Text, Image, TouchableOpacity } from 'react-native';

interface Props {
    title: string;
    author?: string;
    coverId?: number;
    onPress: () => void;
}

const getCoverUrl = (coverId?: number) =>
    coverId
        ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
        : false;

export default function BookCard({ title, author, coverId, onPress }: Props) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="w-44 mr-4">
            <View className="w-full h-64 rounded-lg overflow-hidden bg-gray-200 mb-2">
                <Image
                    source={coverId ? { uri: getCoverUrl(coverId) } : require('@/assets/images/empty_image.png')}
                    className="w-full h-full"
                />
            </View>

            <Text className="font-semibold dark:text-white" numberOfLines={1}>
                {title}
            </Text>
            <Text className="text-gray-500 text-sm dark:text-gray-400" numberOfLines={1}>
                {author || 'Unknown Author'}
            </Text>
        </TouchableOpacity>
    );
}