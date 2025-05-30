import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types/types';
import {
    register as registerUser,
    login as loginUser,
    logout as logoutUser,
    getCurrentUser as getUser,
} from '@/services/auth-services';

export type AuthState = {
    login: {
        status: string;
        message: string;
        style: string;
        buttonStyle: string;
    };
    register: {
        status: string;
        message: string;
        style: string;
        buttonStyle: string;
    };
    showLoginModal: boolean;
    showRegisterModal: boolean;
    currentUser: User | null;
    loading: boolean;
};

type AuthAction = {
    loginUser: (user: User) => Promise<void>;
    registerUser: (user: User) => Promise<void>;
    logoutUser: () => Promise<void>;
    setShowLoginModal: (showLoginModal: boolean) => void;
    setShowRegisterModal: (showRegisterModal: boolean) => void;
    resetLoginModal: () => void;
    resetRegisterModal: () => void;
    fetchCurrentUser: () => Promise<User>;
};

export const useAuthStore = create<AuthState & AuthAction>()(
    persist(
        (set) => ({
            login: {
                status: '',
                message: '',
                style: '',
                buttonStyle: '',
            },
            register: {
                status: '',
                message: '',
                style: '',
                buttonStyle: '',
            },
            showLoginModal: false,
            showRegisterModal: false,
            currentUser: null,
            loading: false,

            loginUser: async (user: User) => {
                try {
                    await loginUser(user);
                    set({
                        login: {
                            status: 'Connexion réussie',
                            message: 'Tu es maintenant connecté',
                            style: 'text-green-500',
                            buttonStyle: 'bg-green-500 hover:bg-green-500/90',
                        },
                        showLoginModal: true,
                    });
                } catch (error) {
                    const message =
                        error instanceof Error
                            ? error.message
                            : 'Erreur inconnue lors de la connexion';
                    set({
                        login: {
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
                    set({
                        register: {
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
                    set({
                        register: {
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
            fetchCurrentUser: async (): Promise<User> => {
                set({ loading: true });
                try {
                    const user = await getUser();
                    set({ currentUser: user });
                    return user;
                } catch (error) {
                    console.error(error);
                    set({ currentUser: null });
                    throw error;
                } finally {
                    set({ loading: false });
                }
            },

            logoutUser: async () => {
                try {
                    await logoutUser();
                    localStorage.removeItem('auth-store');
                    localStorage.removeItem('score');
                    console.log('déconnexion réussie');
                } catch (error) {
                    console.error(
                        error,
                        'Une erreur est survenue lors de la déconnexion'
                    );
                }
            },
            setShowLoginModal: (show: boolean) => set({ showLoginModal: show }),
            setShowRegisterModal: (show: boolean) =>
                set({ showRegisterModal: show }),
            resetLoginModal: () => {
                set({
                    login: {
                        status: '',
                        message: '',
                        style: '',
                        buttonStyle: '',
                    },
                    showLoginModal: false,
                });
            },
            resetRegisterModal: () => {
                set({
                    register: {
                        status: '',
                        message: '',
                        style: '',
                        buttonStyle: '',
                    },
                    showRegisterModal: false,
                });
            },
        }),
        {
            name: 'auth-store',
        }
    )
);
