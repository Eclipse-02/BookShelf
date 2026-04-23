import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "@/components/Header";

export default function AboutScreen() {
  return (
    <View className="flex-1 bg-gray-50 mt-12">
      {/* Top App Bar */}
      <Header />

      {/* Content */}
      <ScrollView className="flex-1 px-5 py-6">
        {/* Header */}
        <View className="items-center mb-10">
          <Text className="text-4xl font-semibold text-slate-900">
            BookShelf
          </Text>
          <Text className="text-sm uppercase tracking-widest text-slate-500 mb-3">
            Version 1.0.0
          </Text>
          <Text className="text-base text-center text-slate-600 max-w-md">
            A minimalist sanctuary for organizing your reading life. Designed to
            eliminate distraction and celebrate the written word.
          </Text>
        </View>

        {/* Cards */}
        <View className="gap-6 mb-10">
          {/* Developer Card */}
          <View className="bg-white border-slate-200 rounded-xl p-4">
            <View className="flex-row items-center gap-2 mb-3">
              <MaterialIcons name="code" size={22} color="#666" />
              <Text className="text-lg font-semibold text-slate-900">
                The Developer
              </Text>
            </View>

            <Text className="text-slate-600 mb-4">
              Crafted with intention by an independent developer passionate
              about typography, editorial design, and creating quiet digital
              spaces.
            </Text>

            <View className="flex-row items-center gap-3">
              <Image
                source={require("../../../assets/images/Me.jpg")}
                className="w-14 h-14 rounded-full"
              />

              <View>
                <Text className="font-semibold text-slate-900 ">
                  Rafa Umar Abdus Syakur
                </Text>
                <Text className="text-sm text-slate-500">
                  B - 2410501045
                </Text>
              </View>
            </View>
          </View>

          {/* API Card */}
          <TouchableOpacity className="bg-white border-slate-200 rounded-xl p-4">
            <View className="flex-row items-center gap-2 mb-3">
              <MaterialIcons name="menu-book" size={22} color="#666" />
              <Text className="text-lg font-semibold text-slate-900">
                Data Source
              </Text>
            </View>

            <Text className="text-slate-600 mb-4">
              Book metadata, cover imagery, and author information are provided
              by Open Library.
            </Text>

            <View className="flex-row items-center justify-between bg-slate-100 p-3 rounded-lg">
              <View className="flex-row items-center gap-3">
                <View className="bg-black p-2 rounded">
                  <MaterialIcons name="library-books" size={18} color="#fff" />
                </View>
                <View>
                  <Text className="font-medium text-slate-900">
                    Open Library API
                  </Text>
                  <Text className="text-xs text-slate-500">
                    openlibrary.org
                  </Text>
                </View>
              </View>

              <MaterialIcons name="arrow-forward" size={18} color="#666" />
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>

    </View>
  );
}