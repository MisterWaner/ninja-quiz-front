import type { User } from '@/types/types';

const BASE_URL = 'ninja-quiz-back-production.up.railway.app';

export async function updateUserPassword(
    userId: User['id'],
    password: User['password']
): Promise<void> {
    try {
        console.log(`Requete envoyée vers ${BASE_URL}/users/${userId}/pwd`);
        const response = await fetch(`${BASE_URL}/users/${userId}/pwd`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ password }),
        });
        console.log(response.status);

        if (response.status === 401)
            throw new Error('Mauvais pseudo ou mot de passe');

        if (response.status === 404) throw new Error('Utilisateur non trouvé');

        if (!response.ok)
            throw new Error('Erreur lors de la modification du mot de passe');

        console.log('Mot de passe modifié avec succès');
    } catch (error) {
        console.error(
            error,
            'Une erreur est survenue lors de la modification du mot de passe'
        );
        throw error;
    }
}

export async function deleteUser(userId: User['id']): Promise<void> {
    try {
        console.log(`Suppression de l'utilisateur: ${userId}`);
        const response = await fetch(`${BASE_URL}/users/${userId}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (!response.ok)
            throw new Error("Erreur lors de la suppression de l'utilisateur");

        console.log('Utilisateur supprimé avec succès');
    } catch (error) {
        console.error(
            error,
            "Une erreur est survenue lors de la suppression de l'utilisateur"
        );
        throw error;
    }
}
