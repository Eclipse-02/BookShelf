import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Linking } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "@/components/Header";
import { useTheme } from '@/hooks/useTheme';


export default function AboutScreen() {
  const { isDark } = useTheme();

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-800 mt-12">
      {/* Top App Bar */}
      <Header />

      {/* Content */}
      <ScrollView className="flex-1 px-5 py-6">
        {/* Header */}
        <View className="items-center mb-10">
          <Text className="text-4xl font-semibold text-slate-900 dark:text-white">
            BookShelf
          </Text>
          <Text className="text-sm uppercase tracking-widest text-slate-500 dark:text-slate-300 mb-3">
            Version 1.0.0
          </Text>
          <Text className="text-base text-center text-slate-600 dark:text-slate-200 max-w-md">
            BookShelf is a React Native-based (TypeScript) app designed to be
            your own personal digital library in the palm of your hand.
          </Text>
        </View>

        {/* Cards */}
        <View className="gap-6 mb-10">
          {/* Developer Card */}
          <TouchableOpacity
            onPress={() => Linking.openURL("https://github.com/Eclipse-02")}
            className="bg-white dark:bg-gray-900 border-slate-200 dark:border-slate-600 rounded-xl p-4"
          >
            <View className="flex-row items-center gap-2 mb-3">
              <MaterialIcons name="code" size={22} color={isDark ? "lightgray" : "gray"} />
              <Text className="text-lg font-semibold text-slate-900 dark:text-white">
                The Developer
              </Text>
            </View>

            <Text className="text-slate-600 dark:text-slate-200 mb-4">
              Developed specifically to fulfill the requirements of the Mid-term Examination project.
            </Text>

            <View className="flex-row items-center gap-3">
              <Image
                source={require("@/assets/images/Me.jpg")}
                className="w-14 h-14 rounded-full"
              />

              <View>
                <Text className="font-semibold text-slate-900 dark:text-white ">
                  Rafa Umar Abdus Syakur
                </Text>
                <Text className="text-sm text-slate-500 dark:text-slate-300">
                  B - 2410501045
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* API Card */}
          <TouchableOpacity
            onPress={() => Linking.openURL("https://openlibrary.org")}
            className="bg-white dark:bg-gray-900 border-slate-200 dark:border-slate-600 rounded-xl p-4"
          >
            <View className="flex-row items-center gap-2 mb-3">
              <MaterialIcons name="menu-book" size={22} color={isDark ? "lightgray" : "gray"} />
              <Text className="text-lg font-semibold text-slate-900 dark:text-white">
                Data Source
              </Text>
            </View>

            <Text className="text-slate-600 dark:text-slate-300 mb-4">
              Book metadata, cover imagery, and author information are provided
              by Open Library.
            </Text>

            <View className="flex-row items-center justify-between bg-slate-100 dark:bg-slate-600 p-3 rounded-lg">
              <View className="flex-row items-center gap-3">
                <View className="bg-black dark:bg-white p-2 rounded">
                  <MaterialIcons name="library-books" size={18} color={isDark ? "black" : "white"} />
                </View>
                <View>
                  <Text className="font-medium text-slate-900 dark:text-white">
                    Open Library API
                  </Text>
                  <Text className="text-xs text-slate-500 dark:text-slate-200">
                    openlibrary.org
                  </Text>
                </View>
              </View>

              <MaterialIcons name="arrow-forward" size={18} color={isDark ? "lightgray" : "gray"} />
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>

    </View>
  );
}