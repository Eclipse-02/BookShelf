import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Skeleton } from 'moti/skeleton';
import Header from '@/components/Header';

export default function DetailSkeleton() {
    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">

            <Header isDetail />

            <ScrollView className="flex-1 px-4 py-6">

                {/* Cover */}
                <View className="items-center mb-6">
                    <Skeleton width="75%" height={400} radius={12} />
                </View>

                {/* Title & Meta */}
                <View className="mb-2">
                    <Skeleton width="80%" height={24} />
                </View>
                <View className="mb-2">
                    <Skeleton width="60%" height={18} />
                </View>
                <View className="mb-6">
                    <Skeleton width="40%" height={14} />
                </View>

                {/* Actions */}
                <View className="flex-row gap-3 mb-6 border-b border-gray-200 dark:border-gray-600 pb-4">
                    <Skeleton width={160} height={40} radius={999} />
                    <Skeleton width={140} height={40} radius={999} />
                </View>

                {/* Synopsis */}
                <View>
                    <Skeleton width={100} height={18} />

                    <View className="mt-3">
                        <Skeleton width="100%" height={60} />
                    </View>
                </View>

                <View className="h-20" />

            </ScrollView>
        </SafeAreaView>
    );
}