export const ENDPOINTS = {
    trending: '/trending/daily.json',
    subjects: '/subjects.json',
    author: (id: string) => `/authors/${id}.json`,
    subjectDetail: (subject: string) => `/subjects/${subject}.json`,
    workDetail: (id: string) => `/works/${id}.json`,
    search: (query: string) => `/search.json?q=${query}`,
};