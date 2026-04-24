import React from 'react';
import { View } from 'react-native';
import { Skeleton } from 'moti/skeleton';

export default function BookCardSkeleton() {
    return (
        <View className="w-44 mr-4">

            {/* Cover */}
            <Skeleton
                width="100%"
                height={228}
                radius={12}
            />

            {/* Title */}
            <View className="mt-2">
                <Skeleton width="90%" height={16} />
            </View>

            {/* Author */}
            <View className="mt-1">
                <Skeleton width="60%" height={14} />
            </View>

        </View>
    );
}