import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons } from "@expo/vector-icons";
import { router } from 'expo-router';

export default function Header({isDetail = false}: {isDetail?: boolean}) {
    return (
        <View className={`flex-row ${isDetail ? 'justify-between' : 'justify-center'} items-center px-5 py-4 bg-white`}>
            {isDetail && (
                <TouchableOpacity onPress={() => router.back()}>
                    <MaterialIcons name="arrow-back" size={20} color="black" />
                </TouchableOpacity>
            )}
            <Text className="text-xl font-semibold italic">BookShelf</Text>
            {isDetail && (
                <View className="w-6" />
            )}
        </View>
    )
}