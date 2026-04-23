import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import React from 'react'
import { MaterialIcons } from "@expo/vector-icons";

const books = [
    {
        id: "1",
        title: "The Spaces Between",
        author: "Eleanor Vance",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlvBrlU4NF8JS3KxcwddbkkRd4dluCki-V-Y7R3JRKWVN6gL6gmCQJEFp1S2tj882qsc9bNWM26fYqfKNtKMRbY3d7uk5Iz2momIB2H2ain5_CfnWkXEdb-8188el7GC8RfUABmYX8HnEQ3rx2HAoZyiDrEd7Ibm5ckSCAUUH4oeqkF5XBRZg9D_ZOYJt9i9pYqAXkQFE5A9IDa_Nd4vWaR-IECHJLszewFtYIVjARu2wzux4hDx6R05hr7iqIewJAoKqa9ZVeY4E",
    },
    {
        id: "2",
        title: "Concrete Utopias",
        author: "Marcus Thorne",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzyDtAnBKqwvRcAgLpXwxbfDU7ary4tLqJheQQiEurwP98j60qi7NFWjyCX5tNPLCeyif--lTZIuKFXjc6xIZOxem4SIJn8HTIwRts87YEL5FOQzJhgzTc6cTfSO3pzWfpKrDgJ1vTZRk13iPnUxzQQHvETb_wEUlbGu4aPVtyvaH2XqzPqdMdPNnwm9YZkse2wKO77gBAm1Ba6g8S9dt0tRHUF5SeK211aQNrORQB6ufbmDuSW1IpPjAedwB8f65TmZ4vmvK1L8I",
    },
    {
        id: "3",
        title: "Concrete Utopias",
        author: "Marcus Thorne",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzyDtAnBKqwvRcAgLpXwxbfDU7ary4tLqJheQQiEurwP98j60qi7NFWjyCX5tNPLCeyif--lTZIuKFXjc6xIZOxem4SIJn8HTIwRts87YEL5FOQzJhgzTc6cTfSO3pzWfpKrDgJ1vTZRk13iPnUxzQQHvETb_wEUlbGu4aPVtyvaH2XqzPqdMdPNnwm9YZkse2wKO77gBAm1Ba6g8S9dt0tRHUF5SeK211aQNrORQB6ufbmDuSW1IpPjAedwB8f65TmZ4vmvK1L8I",
    },
    {
        id: "4",
        title: "Concrete Utopias",
        author: "Marcus Thorne",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzyDtAnBKqwvRcAgLpXwxbfDU7ary4tLqJheQQiEurwP98j60qi7NFWjyCX5tNPLCeyif--lTZIuKFXjc6xIZOxem4SIJn8HTIwRts87YEL5FOQzJhgzTc6cTfSO3pzWfpKrDgJ1vTZRk13iPnUxzQQHvETb_wEUlbGu4aPVtyvaH2XqzPqdMdPNnwm9YZkse2wKO77gBAm1Ba6g8S9dt0tRHUF5SeK211aQNrORQB6ufbmDuSW1IpPjAedwB8f65TmZ4vmvK1L8I",
    },
];

export default function SearchEmptyScreen() {
    return (
        <View>

            <View className="mt-6 mb-6">
                <Text className="text-3xl font-semibold">
                    Browse by Category
                </Text>
                <Text className="text-gray-500 mt-2">
                    Discover new worlds, explore fresh perspectives, and find your next great read curated just for you.
                </Text>
            </View >

            <View className="mb-8">
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-xl font-semibold">
                        Architecture & Design
                    </Text>
                    <TouchableOpacity className="flex-row items-center gap-1">
                        <Text className="text-blue-500">View all</Text>
                        <MaterialIcons name="arrow-forward" size={18} color="blue" />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={books}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity className="mr-4 w-[140px]">
                            <Image
                                source={{ uri: item.image }}
                                className="w-full h-[200px] rounded-lg"
                            />
                            <Text className="mt-2 font-semibold" numberOfLines={2}>
                                {item.title}
                            </Text>
                            <Text className="text-gray-500 text-sm">
                                {item.author}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>

            <View className="mb-8">
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-xl font-semibold">
                        Contemporary Fiction
                    </Text>
                    <TouchableOpacity className="flex-row items-center gap-1">
                        <Text className="text-blue-500">View all</Text>
                        <MaterialIcons name="arrow-forward" size={18} color="blue" />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={books}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity className="mr-4 w-[140px]">
                            <Image
                                source={{ uri: item.image }}
                                className="w-full h-[200px] rounded-lg"
                            />
                            <Text className="mt-2 font-semibold" numberOfLines={2}>
                                {item.title}
                            </Text>
                            <Text className="text-gray-500 text-sm">
                                {item.author}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View >

        </View>
    )
}