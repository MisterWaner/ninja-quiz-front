import type { Score } from '@/types/types';

const BASE_URL = import.meta.env.VITE_API_URL;

export async function postScore(score: Omit<Score, 'id'>): Promise<Score> {
    try {
        const response = await fetch(`${BASE_URL}/scores`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(score),
        });

        if (response.ok) {
            const data = (await response.json()) as Score;
            console.log(data)
            return data;
        } else {
            throw new Error(
                'Une erreur est survenue lors de la récupération des scores'
            );
        }
    } catch (error) {
        console.error('Une erreur est survenue', error);
        throw error;
    }
}
