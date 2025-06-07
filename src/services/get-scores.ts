import type { UserDailyScore, UserGlobalScore } from '@/types/types';

const BASE_URL = 'http://localhost:3001/scores';

export async function getGLobalScores(): Promise<UserGlobalScore[]> {
    try {
        const response = await fetch(`${BASE_URL}/global`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = (await response.json()) as UserGlobalScore[];
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

export async function getDailyScores(): Promise<UserDailyScore[]> {
    try {
        const response = await fetch(`${BASE_URL}/daily`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = (await response.json()) as UserDailyScore[];
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
