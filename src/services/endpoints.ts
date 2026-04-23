export const ENDPOINTS = {
    trending: '/trending/daily.json',
    subjects: '/subjects.json',
    subjectDetail: (subject: string) => `/subjects/${subject}.json`,
    workDetail: (id: string) => `/works/${id}.json`,
    search: (query: string) => `/search.json?q=${query}`,
};