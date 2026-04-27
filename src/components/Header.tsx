import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons } from "@expo/vector-icons";
import { router } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';

export default function Header({ isDetail = false }: { isDetail?: boolean }) {
    const { toggleTheme, isDark } = useTheme();

    return (
        <View className={`flex-row justify-between items-center px-5 py-4 bg-white dark:bg-gray-900`}>
            {isDetail ? (
                <TouchableOpacity onPress={() => router.back()}>
                    <MaterialIcons name="arrow-back" size={20} color={isDark ? "white" : "black"} />
                </TouchableOpacity>
            ) : <View className="w-6" />}
            <Text className="text-xl dark:text-white font-semibold italic">BookShelf</Text>
            <TouchableOpacity onPress={toggleTheme}>
                <MaterialIcons name={isDark ? "light-mode" : "mode-night"} size={20} color={isDark ? "white" : "black"} />
            </TouchableOpacity>
        </View>
    )
}