import { View } from 'react-native';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/context/ThemeContext';
import { useTheme } from '@/hooks/useTheme';
import { useColorScheme } from 'nativewind';
import 'react-native-reanimated';
import { useEffect } from 'react';

const queryClient = new QueryClient();

function RootTheme() {
    const { isDark } = useTheme();
    const { setColorScheme } = useColorScheme();

    useEffect(() => {
        setColorScheme(isDark ? 'dark' : 'light');
    }, [isDark, setColorScheme]);

    return (
        <View className={isDark ? 'dark flex-1' : 'flex-1'}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="detail" />
                <Stack.Screen name="browse" />
            </Stack>
        </View>
    );
}

export default function RootLayout() {
    return (
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <RootTheme />
            </QueryClientProvider>
        </ThemeProvider>
    );
}