import Header from "@/components/Header";
import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

const books = [
  {
    id: "1",
    title: "The Architecture of Happiness",
    author: "Alain de Botton",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBev8h6FyB9U2q9NCh2-pXlCGNlVe-xAcv0M_Cy-kjF74ENkI4xRo2XDh71333myX2g__9zePKiNdhHE0Kelbqzlqc9iZuV8aidL-wVbMLvq_M9tNZfLKUSysGD9pjKzSNj0ILaNDSu1xZkiNZ_VHR7A8vtDQ7K3dMb4p-dw-JI14t-V1gB5Hv4apKRQpbayZiiK4Lo_N6vwDTuFLY3se8wlUTyW9GUBtUlQs2j960UyFH82ARexztecdKJ0NBfWq-K3UTeNB17_Qo",
  },
  {
    id: "2",
    title: "Design as Art",
    author: "Bruno Munari",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAqycsQUkDF7ZPJchuXjnYE3vamjdm-uaUikJlMN_sgukl8ln3yDv_0OBn1CUUAZGnnIrsF4s49PGQwON0Kxj0QFmdDhNuLosW0rAdSgfqqRgpJioNKZM-XU--q-JDp14y765Da4GBfJyVhmYo8GSEXELcsMUz5tDigVvYRV9Ck4YVrww7ns5PbpP1Ju9h9gZ9j3B5ZcOzIjMQ_uchvkTKArOFhhm_mry4my99i_Zu6Vle8R_hVhxvpSf6Il0eedOw3F6pdbTUOgfA",
  },
  {
    id: "3",
    title: "The Hidden Life of Trees",
    author: "Peter Wohlleben",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCsA0Aw2wo0HUUQM5aCLO5I2vVOglnAEXQMiceZTvnx6eDel0DD6ARs0lWLhP_rK5BoXSDEzztTy59pt4JMIovk04dqRi8YGZHgREuS7APumpsrla-zhw1JSd0X25mWyCRJHUbm1_WKEvaXeLYcUUf1Uc8Hsb0hPusMpgJP2o_HL_yFFeY7MKDXWmH7-FdY_aGfytUdREwj7qGxlLuMus6dG5HLorZRelahuSgU2cOsTKlLXjIVAltJgNgE5Wb2Ble3H0SIx1ORAzM",
  },
  {
    id: "4",
    title: "In Praise of Shadows",
    author: "Jun'ichirō Tanizaki",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDWID9mP3c_y-LFWp1nABq5u4ElqIe3brVTFT45ccYUJhwdk67-BT6NpJqCAFEQew3VVwfT4CyxnGLjRrOjVa49CWmNDd0wvqwWc0N3YTDXIFwuLyMtUnoxZl27LuRfkZ11DGIaZTymoO8ITVCwKcd1KRKM5Anhl-UtQs6Kkg79O4YYS1Y8vTO5KknXvVpZThBhBVrQcQlQEEGumdPTvo4MrImB2o0cC2Fb4VeOydUzh3KbzJw63xrxqfV96IAnFSkhaM8v0KbE7Zw",
  },
];

export default function BookmarksScreen() {
  const renderItem = ({ item }: any) => (
    <View className="w-[48%] mb-5">
      <View className="relative w-full aspect-[2/3] rounded-xl overflow-hidden bg-gray-200">
        <Image source={{ uri: item.image }} className="w-full h-full" />

        <TouchableOpacity className="absolute top-2 right-2 bg-white/90 rounded-full p-2">
          <Ionicons name="bookmark" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <Text numberOfLines={2} className="mt-2 font-semibold text-gray-900">
        {item.title}
      </Text>
      <Text className="text-gray-500 text-xs mt-1">{item.author}</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50 mt-12">
      {/* HEADER */}
      <Header />

      {/* CONTENT */}
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="px-4 pt-4">
          <Text className="text-2xl font-semibold text-gray-900">
            Your Bookmarks
          </Text>
          <Text className="text-gray-500 mt-2">
            A curated collection of your most cherished reads.
          </Text>

          {/* FILTERS */}
          <View className="flex-row gap-2 mt-4">
            <TouchableOpacity className="px-4 py-2 rounded-full bg-gray-900">
              <Text className="text-white text-xs font-semibold">
                All Saved
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="px-4 py-2 rounded-full bg-gray-200">
              <Text className="text-xs">Fiction</Text>
            </TouchableOpacity>

            <TouchableOpacity className="px-4 py-2 rounded-full bg-gray-200">
              <Text className="text-xs">Design</Text>
            </TouchableOpacity>
          </View>

          {/* GRID */}
          <FlatList
            data={books}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "space-between",
            }}
            scrollEnabled={false}
            className="mt-5"
          />
        </View>
      </ScrollView>

    </View>
  );
}