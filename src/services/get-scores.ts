import type {
    User,
    UserDailyScore,
    UserGlobalScore,
    UserGlobalScoreBySubject,
    UserGlobalScoreByTheme,
} from '@/types/types';

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
            console.log(data);
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
            console.log(data);
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

export async function getUserGlobalScoreByTheme({
    userId,
}: {
    userId: User['id'];
}): Promise<UserGlobalScoreByTheme[]> {
    try {
        const response = await fetch(`${BASE_URL}/${userId}/global/by-theme`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = (await response.json()) as UserGlobalScoreByTheme[];
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

export async function getUserGlobalScoreBySubject({
    userId,
}: {
    userId: User['id'];
}): Promise<UserGlobalScoreBySubject[]> {
    try {
        const response = await fetch(`${BASE_URL}/${userId}/global/by-subject`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = (await response.json()) as UserGlobalScoreBySubject[];
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
