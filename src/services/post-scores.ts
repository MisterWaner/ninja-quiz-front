import type { Score } from '@/types/types';

const BASE_URL = 'http://localhost:3001/scores';

export async function postScore(score: Omit<Score, 'id'>): Promise<Score> {
    try {
        const response = await fetch(`${BASE_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(score),
        });

        if (response.ok) {
            const data = (await response.json()) as Score;
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
