import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import type {User} from '@/types/types.ts';

export type AuthState = {
    loginFeedback: {
        status: string;
        message: string;
        style: string;
        buttonStyle: string;
    };
    registerFeedback: {
        status: string;
        message: string;
        style: string;
        buttonStyle: string;
    };
    updateFeedback: {
        status: string;
        message: string;
        style: string;
        buttonStyle: string;
    };
    showUpdatePasswordModal: boolean;
    showLoginModal: boolean;
    showRegisterModal: boolean;
    currentUser: User | null;
    isAuthenticated: boolean;
    loading: boolean;
};

export const useAuthStore = create<AuthState>()(
        persist(
            (_set) => ({
                loginFeedback: {
                    status: '',
                    message: '',
                    style: '',
                    buttonStyle: '',
                },
                registerFeedback: {
                    status: '',
                    message: '',
                    style: '',
                    buttonStyle: '',
                },
                updateFeedback: {
                    status: '',
                    message: '',
                    style: '',
                    buttonStyle: '',
                },
                showUpdatePasswordModal: false,
                showLoginModal: false,
                showRegisterModal: false,
                currentUser: null,
                isAuthenticated: false,
                loading: false,
            }),
            {
                name: 'auth-store',
                storage:
                    createJSONStorage(() => localStorage)
            }
        )
    )
;
