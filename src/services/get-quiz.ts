import type { Quiz, Subject, Theme } from '@/types/types';

const BASE_URL = import.meta.env.VITE_API_URL;


export type PathProps = {
    subjectPath: Subject['subjectPath'];
    themePath: Theme['themePath'];
};

export async function getQuiz({
    subjectPath,
    themePath,
}: PathProps): Promise<Quiz | object> {
    try {
        const response = await fetch(
            `${BASE_URL}/quiz/${subjectPath}/${themePath}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.ok) {
            const data = (await response.json()) as Quiz;
            console.log(data);
            return data;
        } else {
            console.error('Failed to fetch quiz:', response.status);
            return {};
        }
    } catch (error) {
        console.error('Error fetching quiz:', error);
        return {};
    }
}
