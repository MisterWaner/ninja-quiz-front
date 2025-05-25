import type { User } from '@/types/types';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const BASE_URL = 'http://localhost:3001/auth';

export async function register(user: User): Promise<void> {
    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log(responseData, 'Utilisateur enregistré');
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

export async function login(user: User) {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la connexion');
        }
        const {token} = await response.json();
        const { id, username } = jwtDecode<User>(token);

        Cookies.set('token', token, {
            expires: 1,
            secure: true,
            sameSite: 'None',
        });

        return { id, username };
    } catch (error) {
        console.error(error, 'Une erreur est survenue lors de la connexion');
        throw error;
    }
}

export async function logout(user: User) {
    try {
        const response = await fetch(`${BASE_URL}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(user),
        });

        // Log the API response status and body
        console.log('Logout API response status:', response.status);
        const responseBody = await response.text();
        console.log('Logout API response body:', responseBody);

        if (!response.ok) {
            throw new Error('Erreur lors de la déconnexion');
        }

        Cookies.remove('token');
        localStorage.removeItem('score');
        console.log('déconnexion réussie');
        window.location.reload();
    } catch (error) {
        console.error(error, 'Une erreur est survenue lors de la déconnexion');
        throw error;
    } finally {
        Cookies.remove('token');
        localStorage.removeItem('score');
    }
}
