import { SUBJECT_MAP } from '@/constants/subjectMap';

export function mapBookToCategory(subjects?: string[]): string[] {
    if (!subjects) return [];

    const normalized = subjects.map((s) => s.toLowerCase());
    const matched: string[] = [];

    Object.entries(SUBJECT_MAP).forEach(([category, keywords]) => {
        const found = normalized.some((subj) =>
            keywords.some((key) => subj.includes(key))
        );

        if (found) matched.push(category);
    });

    return matched;
}