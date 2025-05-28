import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
    Form,
    FormControl,
    FormLabel,
    FormItem,
    FormField,
    FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import LoginModal from './LoginModal';
import { loginSchema } from '@/lib/zod-schemas';
import { useAuthStore } from '@/store/auth-store';

export default function LoginForm() {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
    });
    const queryClient = useQueryClient();

    
    const { login, setShowLoginModal, showLoginModal, loginUser } =
    useAuthStore();
    
    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['currentUser'] });
        }
    })

    function resetForm(): void {
        form.reset({
            username: '',
            password: '',
        });
    }

    async function handleLogin(values: z.infer<typeof loginSchema>) {
        try {
            loginMutation.mutate(values);
            console.log('Formulaire valide');
        } catch (error) {
            if (error instanceof Error) {
                console.error(error, "Erreur lors de l'envoie des données");
                console.log(values);
            }
        }
    }

    return (
        <Form {...form}>
            <form
                className='flex flex-col gap-4'
                onSubmit={form.handleSubmit(handleLogin)}
            >
                <FormField
                    name='username'
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Pseudo</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder='Pseudo'
                                    type='text'
                                    required
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    name='password'
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mot de passe</FormLabel>
                            <FormControl>
                                <Input
                                    type='password'
                                    placeholder='Mot de passe'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='flex justify-end'>
                    <Button
                        type='submit'
                        disabled={!form.formState.isValid}
                        className='w-full xl:w-1/2 hover:cursor-pointer'
                    >
                        Se connecter
                    </Button>
                    <LoginModal
                        login={login}
                        onClose={resetForm}
                        onOpenChange={(open) => setShowLoginModal(open)}
                        open={showLoginModal}
                    />
                </div>
            </form>
        </Form>
    );
}
