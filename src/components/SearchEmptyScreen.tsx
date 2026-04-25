import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import BookCard from './BookCard';
import SubjectBookListSkeleton from "./SubjectBookListSkeleton";

export default function SearchEmptyScreen({ data = [], loading }: { data?: any[]; loading: boolean }) {
    const sections = Array.isArray(data) ? data : [];

    return (
        <View>

            <View className="mt-6 mb-6">
                <Text className="text-3xl font-semibold">
                    Browse by Category
                </Text>
                <Text className="text-gray-500 mt-2">
                    Discover new worlds, explore fresh perspectives, and find your next great read curated just for you.
                </Text>
            </View>

            {loading && sections.length === 0 ? (
                Array.from({ length: 5 }).map((_, i) => (
                    <SubjectBookListSkeleton key={i} />
                ))
            ) : sections.length === 0 ? (
                <View className="flex-1 justify-center items-center mt-10">
                    <Ionicons name="search" size={48} color="#999" />
                    <Text className="text-gray-500 mt-4">No categories available right now.</Text>
                </View>
            ) : (
                sections.map((section: any) => {
                    const books = Array.isArray(section.books) ? section.books : [];

                    return (
                        <View key={section.subject} className="mb-8">
                            <View className="flex-row justify-between items-center mb-4">
                                <Text className="text-xl font-semibold">
                                    {section.subject}
                                </Text>
                                <TouchableOpacity className="flex-row items-center gap-1">
                                    <Text className="text-blue-500">View all</Text>
                                    <MaterialIcons name="arrow-forward" size={18} color="blue" />
                                </TouchableOpacity>
                            </View>

                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {books.map((book: any) => {
                                    const id = book.key?.replace('/works/', '');

                                    return (
                                        <BookCard
                                            key={book.key}
                                            title={book.title}
                                            author={book.authors?.[0]?.name}
                                            coverId={book.cover_id}
                                            onPress={() =>
                                                router.push({
                                                    pathname: '/detail/[id]',
                                                    params: { id },
                                                })
                                            }
                                        />
                                    );
                                })}
                            </ScrollView>
                        </View>
                    );
                })
            )}

        </View>
    )
}