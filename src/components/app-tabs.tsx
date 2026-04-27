import Ionicons from '@expo/vector-icons/Ionicons';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import React from 'react';
import { useColorScheme } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

import { Colors } from '@/constants/theme';

export default function AppTabs() {
  const scheme = useColorScheme();
  const { isDark } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{ selected: { color: colors.text } }}
      iconColor={colors.text}>
      <NativeTabs.Trigger name="HomeScreen">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={
            <NativeTabs.Trigger.VectorIcon
              family={Ionicons}
              name="home"
            />
          }
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="BookmarksScreen">
        <NativeTabs.Trigger.Label>Bookmarks</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={
            <NativeTabs.Trigger.VectorIcon
              family={Ionicons}
              name="bookmarks"
            />
          }
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="SearchScreen">
        <NativeTabs.Trigger.Label>Search</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={
            <NativeTabs.Trigger.VectorIcon
              family={Ionicons}
              name="search"
            />
          }
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="AboutScreen">
        <NativeTabs.Trigger.Label>About</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={
            <NativeTabs.Trigger.VectorIcon
              family={Ionicons}
              name="help-sharp"
            />
          }
        />
      </NativeTabs.Trigger>

    </NativeTabs>
  );
}
