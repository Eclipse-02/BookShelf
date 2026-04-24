import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Book = {
    key: string;
    title: string;
    author?: string;
    covers?: number[];
};

type BookmarkStore = {
    bookmarks: Record<string, Book>;
    hydrated: boolean;
    setHydrated: () => void;
    toggle: (book: Book) => void;
    isBookmarked: (key: string) => boolean;
};

export const useBookmarks = create<BookmarkStore>()(
    persist(
        (set, get) => ({
            bookmarks: {},
            hydrated: false,

            toggle: (book) => {
                const exists = get().bookmarks[book.key];

                set((state) => {
                    const next = { ...state.bookmarks };

                    if (exists) {
                        delete next[book.key];
                    } else {
                        next[book.key] = book;
                    }

                    return { bookmarks: next };
                });
            },

            isBookmarked: (key) => !!get().bookmarks[key],
            setHydrated: () => set({ hydrated: true }),
        }),
        {
            name: 'bookmarks-storage',
            storage: createJSONStorage(() => AsyncStorage),

            onRehydrateStorage: () => (state) => {
                state?.setHydrated();
            },
        }
    )
);