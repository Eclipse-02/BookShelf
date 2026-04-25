import { View } from 'react-native';
import { Skeleton } from 'moti/skeleton';

type Props = {
    itemCount?: number;
};

export default function SubjectBookListSkeleton({
    itemCount = 6,
}: Props) {
    const items = Array.from({ length: itemCount });

    return (
        <View className="mb-8">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-4">

                {/* Title */}
                <Skeleton
                    width={160}
                    height={24}
                    radius={6}
                />

                {/* View All */}
                <View className="flex-row items-center gap-2">
                    <Skeleton width={60} height={16} radius={6} />
                    <Skeleton width={16} height={16} radius="round" />
                </View>
            </View>

            {/* Horizontal Cards */}
            <View className="flex-row">
                {items.map((_, index) => (
                    <View key={index} className="w-44 mr-4">

                        {/* Cover */}
                        <Skeleton
                            width="100%"
                            height={256}
                            radius={12}
                        />

                        {/* Title */}
                        <View className="mt-2">
                            <Skeleton width="75%" height={16} radius={6} />
                        </View>

                        {/* Author */}
                        <View className="mt-1">
                            <Skeleton width="50%" height={12} radius={6} />
                        </View>

                    </View>
                ))}
            </View>
        </View>
    );
}