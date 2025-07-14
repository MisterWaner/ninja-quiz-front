import { create } from 'zustand';
import type { User } from '@/types/types.ts';
import {
    register as registerUser,
    login as loginUser,
    logout as logoutUser,
    getCurrentUser as getUser,
} from '@/services/auth-services.ts';
import { updateUserPassword } from '@/services/user-services.ts';
import { useAuthStore, type AuthState } from '@/store/auth-store.ts';
import { queryClient } from '@/main';

const initialAuthState: AuthState = useAuthStore.getState();

export type AuthAction = {
    fetchCurrentUser: () => Promise<User | null>;
    loginUser: (user: User) => Promise<void>;
    logoutUser: () => Promise<void>;
    registerUser: (user: User) => Promise<void>;
    resetLoginModal: () => void;
    resetRegisterModal: () => void;
    resetUpdatePasswordModal: () => void;
    setIsAuthenticated: (value: boolean) => void;
    setIsAuthInitialized: (value: boolean) => void;
    setShowLoginModal: (showLoginModal: boolean) => void;
    setShowRegisterModal: (showRegisterModal: boolean) => void;
    setShowUpdatePasswordModal: (showUpdatePasswordModal: boolean) => void;
    updatePassword: (
        userId: User['id'],
        password: User['password']
    ) => Promise<void>;
};

export const useAuthActions = create<AuthAction>()(() => ({
    loginUser: async (user: User) => {
        try {
            await loginUser(user);
            useAuthStore.setState({
                loginFeedback: {
                    status: 'Connexion réussie',
                    message: 'Tu es maintenant connecté',
                    style: 'text-green-500',
                    buttonStyle: 'bg-green-500 hover:bg-green-500/90',
                },
                showLoginModal: true,
                isAuthenticated: true,
            });
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'Erreur inconnue lors de la connexion';
            useAuthStore.setState({
                loginFeedback: {
                    status: 'Erreur de connexion',
                    message,
                    style: 'text-red-500',
                    buttonStyle: 'bg-red-500 hover:bg-red-500/90',
                },
                showLoginModal: true,
            });
            console.error('Erreur de connexion:', error);
        }
    },

    registerUser: async (user: User) => {
        try {
            await registerUser(user);
            useAuthStore.setState({
                registerFeedback: {
                    status: 'Inscription réussie',
                    message: 'Tu es maintenant inscrit',
                    style: 'text-green-500',
                    buttonStyle: 'bg-green-500 hover:bg-green-500/90',
                },
                showRegisterModal: true,
            });
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Erreur inconnue lors de l'inscription";
            useAuthStore.setState({
                registerFeedback: {
                    status: "Erreur d'inscription",
                    message,
                    style: 'text-red-500',
                    buttonStyle: 'bg-red-500 hover:bg-red-500/90',
                },
                showRegisterModal: true,
            });
            console.error("Erreur d'inscription:", error);
        }
    },
    updatePassword: async (userId: User['id'], password: User['password']) => {
        try {
            await updateUserPassword(userId, password);
            useAuthStore.setState({
                updateFeedback: {
                    status: 'Mot de passe modifié avec succès',
                    message: 'Ton mot de passe a été modifié',
                    style: 'text-green-500',
                    buttonStyle: 'bg-green-500 hover:bg-green-500/90',
                },
            });
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'Erreur inconnue lors de la modification du mot de passe';
            useAuthStore.setState({
                updateFeedback: {
                    status: 'Erreur lors de la modification du mot de passe',
                    message,
                    style: 'text-red-500',
                    buttonStyle: 'bg-red-500 hover:bg-red-500/90',
                },
            });
            console.error(
                'Erreur lors de la modification du mot de passe:',
                error
            );
        }
    },

    fetchCurrentUser: async (): Promise<User | null> => {
        useAuthStore.setState({ loading: true });
        try {
            const user = await getUser();
            if (!user) {
                useAuthStore.setState({
                    currentUser: null,
                    isAuthenticated: false,
                });
                return null;
            }
            useAuthStore.setState({ currentUser: user, isAuthenticated: true });
            return user as User;
        } catch (error) {
            console.error(error);
            useAuthStore.setState({
                currentUser: null,
                isAuthenticated: false,
            });
            throw error;
        } finally {
            useAuthStore.setState({ loading: false, isAuthInitialized: true });
        }
    },

    logoutUser: async () => {
        try {
            await logoutUser();
            useAuthStore.setState({
                ...initialAuthState,
                currentUser: null,
                isAuthenticated: true,
            });
            useAuthStore.persist.clearStorage();

            localStorage.removeItem('auth-store');
            localStorage.removeItem('score');
            queryClient.removeQueries({ queryKey: ['currentUser'] });
            console.log('déconnexion réussie');
        } catch (error) {
            console.error(
                error,
                'Une erreur est survenue lors de la déconnexion'
            );
        }
    },
    setShowLoginModal: (show: boolean) =>
        useAuthStore.setState({ showLoginModal: show }),
    setShowRegisterModal: (show: boolean) =>
        useAuthStore.setState({ showRegisterModal: show }),
    setShowUpdatePasswordModal: (show: boolean) =>
        useAuthStore.setState({ showUpdatePasswordModal: show }),
    resetLoginModal: () => {
        useAuthStore.setState({
            loginFeedback: {
                status: '',
                message: '',
                style: '',
                buttonStyle: '',
            },
            showLoginModal: false,
        });
    },
    resetRegisterModal: () => {
        useAuthStore.setState({
            registerFeedback: {
                status: '',
                message: '',
                style: '',
                buttonStyle: '',
            },
            showRegisterModal: false,
        });
    },
    resetUpdatePasswordModal: () => {
        useAuthStore.setState({
            updateFeedback: {
                status: '',
                message: '',
                style: '',
                buttonStyle: '',
            },
            showUpdatePasswordModal: false,
        });
    },
    setIsAuthenticated: (value: boolean) =>
        useAuthStore.setState({ isAuthenticated: value }),
    setIsAuthInitialized: (value: boolean) =>
        useAuthStore.setState({ isAuthInitialized: value }),
}));
