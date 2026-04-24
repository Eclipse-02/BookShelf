import { Text, TouchableOpacity } from 'react-native';
import { useBookmarks } from '@/hooks/useBookmarks';

type Props = {
    book: {
        key: string;
        title: string;
        author?: string;
        covers?: number[];
    };
};

export default function BookmarkButton({ book }: Props) {
    const { hydrated, toggle, isBookmarked } = useBookmarks();
    const bookmarked = isBookmarked(book.key);
    if (!hydrated) return null;

    return (
        <TouchableOpacity
            onPress={() => toggle(book)}
            className={`px-4 py-2 rounded-full ${bookmarked ? 'bg-red-500' : 'bg-black'}`}
        >
            <Text className="text-white font-medium">
                {bookmarked ? 'Remove Bookmark' : 'Add to Bookmarks'}
            </Text>
        </TouchableOpacity>
    );
}