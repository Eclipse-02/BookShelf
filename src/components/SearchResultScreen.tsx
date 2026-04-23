import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function SearchResultScreen() {
    return (
        <View>
            {/* Results Header */}
            <View className="flex-row justify-between items-end mb-4">
                <Text className="text-lg font-semibold">Results</Text>
                <Text className="text-sm text-gray-500">24 found</Text>
            </View>

            {/* Results Grid */}
            <View className="flex-row flex-wrap justify-between">

                {/* Card */}
                {[1, 2, 3, 4, 5].map((item) => (
                    <TouchableOpacity
                        key={item}
                        className="w-[48%] mb-6"
                    >
                        <View className="aspect-[2/3] rounded-lg overflow-hidden bg-gray-200 mb-2">
                            <Image
                                source={{ uri: 'https://via.placeholder.com/300x450' }}
                                className="w-full h-full"
                            />
                        </View>

                        <Text className="font-semibold text-base mb-1" numberOfLines={1}>
                            Book Title
                        </Text>
                        <Text className="text-sm text-gray-500" numberOfLines={1}>
                            Author Name
                        </Text>
                    </TouchableOpacity>
                ))}

            </View>
        </View>
    )
}