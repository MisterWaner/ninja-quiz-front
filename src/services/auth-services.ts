import type { User } from '@/types/types';

const BASE_URL = 'https://ninja-quiz-back-production-10ce.up.railway.app';

export async function register(user: User): Promise<void> {
    try {
        const response = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (response.status === 409) {
            throw new Error('Ce pseudo est déjà utilisé');
        }

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            throw new Error("Erreur lors de l'enregistrement");
        }
    } catch (error) {
        console.error(
            error,
            "Une erreur est survenue lors de l'enregistrement"
        );
        throw error;
    }
}

export async function login(user: User): Promise<void> {
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(user),
        });

        if (response.status === 401) {
            throw new Error('Mauvais pseudo ou mot de passe');
        }

        if (!response.ok) {
            throw new Error('Erreur lors de la connexion');
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error(error, 'Une erreur est survenue lors de la connexion');
        throw error;
    }
}

export async function logout(): Promise<void> {
    try {
        const response = await fetch(`${BASE_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la déconnexion');
        }

        localStorage.removeItem('score');
        console.log('déconnexion réussie');
    } catch (error) {
        console.error(error, 'Une erreur est survenue lors de la déconnexion');
        throw error;
    } finally {
        localStorage.removeItem('score');
    }
}

export async function getCurrentUser(): Promise<User | null> {
    try {
        const response = await fetch(`${BASE_URL}/auth/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (response.status === 401 || response.status === 403) {
            return null;
        }

        if (!response.ok) {
            throw new Error("Erreur lors de la récupération de l'utilisateur");
        }

        const user = (await response.json()) as User;
        return user;
    } catch (error) {
        console.error(
            error,
            "Une erreur est survenue lors de la récupération de l'utilisateur"
        );
        throw error;
    }
}
