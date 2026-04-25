export const ENDPOINTS = {
    trending: '/trending/daily.json',
    subjects: '/subjects.json',
    author: (id: string) => `/authors/${id}.json`,
    subjectDetail: (subject: string, limit: number) => `/subjects/${subject}.json?limit=${limit}`,
    workDetail: (id: string) => `/works/${id}.json`,
    search: (query: string, page = 1, limit = 20) => `/search.json?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`,
};