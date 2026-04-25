import { useState, useEffect } from 'react';

export function useSearchQuery(delay = 500) {
    const [query, setQuery] = useState('');
    const [debounced, setDebounced] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounced(query.trim());
        }, delay);

        return () => clearTimeout(timer);
    }, [query]);

    return {
        query,
        setQuery,
        debouncedQuery: debounced,
        isSearching: debounced.length >= 3,
    };
}