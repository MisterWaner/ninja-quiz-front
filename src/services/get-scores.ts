import type {
    User,
    UserAverageScoreSortedBySubject,
    UserAverageScoreSortedByTheme,
    UserDailyScore,
    UserGlobalScore,
    UserGlobalScoreBySubject,
    UserGlobalScoreByTheme,
} from '@/types/types';

const BASE_URL = 'https://ninja-quiz-back-production-10ce.up.railway.app';

export async function getGlobalScores(): Promise<UserGlobalScore[]> {
    try {
        const response = await fetch(`${BASE_URL}/scores/global`, {
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
        const response = await fetch(`${BASE_URL}/scores/daily`, {
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
        const response = await fetch(`${BASE_URL}/scores/${userId}/global/by-theme`, {
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
        const response = await fetch(`${BASE_URL}/scores/${userId}/global/by-subject`, {
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

export async function getUserAverageScoreSortedByTheme({userId}: {userId: User['id']}): Promise<UserAverageScoreSortedByTheme[]> {
    try {
        const response = await fetch(`${BASE_URL}/scores/${userId}/average/by-theme`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = (await response.json()) as UserAverageScoreSortedByTheme[];
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

export async function getUserAverageScoreSortedBySubject({userId}: {userId: User['id']}): Promise<UserAverageScoreSortedBySubject[]> {
    try {
        const response = await fetch(`${BASE_URL}/scores/${userId}/average/by-subject`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = (await response.json()) as UserAverageScoreSortedBySubject[];
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