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
        : 'https://via.placeholder.com/100x150';

export default function BookCard({ title, author, coverId, onPress }: Props) {
    return (
        <TouchableOpacity
        onPress={onPress}
        className="w-44 mr-4">
            <View className="w-full h-64 rounded-lg overflow-hidden bg-gray-200 mb-2">
                <Image
                    source={{
                        uri: getCoverUrl(coverId),
                    }}
                    className="w-full h-full"
                />
            </View>

            <Text className="font-semibold" numberOfLines={1}>
                {title}
            </Text>
            <Text className="text-gray-500 text-sm" numberOfLines={1}>
                {author || 'Unknown Author'}
            </Text>
        </TouchableOpacity>
    );
}