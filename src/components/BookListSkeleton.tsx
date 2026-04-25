import React from 'react';
import { View } from 'react-native';
import BookCardSkeleton from './BookCardSkeleton';

type Props = {
    count?: number;
    horizontal?: boolean;
    numColumns?: number;
};

export default function BookListSkeleton({
    count = 6,
    horizontal = false,
    numColumns = 1,
}: Props) {
    const items = Array.from({ length: count });

    if (horizontal) {
        return (
            <View className="flex-row px-4 mt-4">
                {items.map((_, i) => (
                    <BookCardSkeleton key={i} />
                ))}
            </View>
        );
    }

    if (numColumns > 1) {
        const rows = [];

        for (let i = 0; i < items.length; i += numColumns) {
            rows.push(items.slice(i, i + numColumns));
        }

        return (
            <View className="px-4 mt-4 mb-4">
                {rows.map((row, rowIndex) => (
                    <View
                        key={rowIndex}
                        className="flex-row justify-between mb-4"
                    >
                        {row.map((_, colIndex) => (
                            <BookCardSkeleton key={colIndex} />
                        ))}

                        {row.length < numColumns && (
                            <View style={{ width: '48%' }} />
                        )}
                    </View>
                ))}
            </View>
        );
    }

    return (
        <View className="px-4 mt-4">
            {items.map((_, i) => (
                <View key={i} className="mb-4">
                    <BookCardSkeleton />
                </View>
            ))}
        </View>
    );
}