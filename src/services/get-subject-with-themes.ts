import type { Subject } from '@/types/types';

const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;

export async function getSubjectWithThemes(): Promise<Subject[]> {
    try {
        const response = await fetch(`${BASE_URL}/subjects/with-themes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = (await response.json()) as Subject[];
            return data;
        } else {
            console.error('Failed to fetch subjects:', response.status);
            return [];
        }
    } catch (error) {
        console.error('Error fetching subjects:', error);
        return [];
    }
}
