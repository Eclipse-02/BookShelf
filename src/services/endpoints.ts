export const ENDPOINTS = {
    trending: (page = 1) => `/trending/weekly.json?page=${page}`,
    subjectBooks: (subject: string, page = 1) => `/subjects/${subject}.json?limit=20&offset=${(page - 1) * 20}`,
    author: (id: string) => `/authors/${id}.json`,
    subjectDetail: (subject: string, limit: number) => `/subjects/${subject}.json?limit=${limit}`,
    workDetail: (id: string) => `/works/${id}.json`,
    search: (query: string, page = 1, limit = 20) => `/search.json?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`,
};