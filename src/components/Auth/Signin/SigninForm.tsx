import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';

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

import SigninModal from './SigninModal';
import { registerSchema } from '@/lib/zod-schemas';
import { useAuthStore } from '@/store/auth-store';
import {useAuthActions} from '@/store/auth-action.ts'

export default function SigninForm() {
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
    });

    const { registerFeedback, showRegisterModal } =
        useAuthStore();
    const {setShowRegisterModal, registerUser} = useAuthActions();

    async function handleRegister(values: z.infer<typeof registerSchema>) {
        try {
            await registerUser(values);
            console.log('Formulaire valide');
        } catch (error) {
            if (error instanceof Error) {
                console.error(error, "Erreur lors de l'envoie des données");
                console.log(values);
            }
        }
    }

    function resetForm(): void {
        form.reset({
            username: '',
            password: '',
            confirmPassword: '',
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRegister)} className='flex flex-col gap-4'>
                <FormField 
                    control={form.control}
                    name='username'
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
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mot de passe</FormLabel>
                            <FormControl>
                                <Input
                                    type='password'
                                    placeholder='Mot de passe'
                                    {...field}
                                    required
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='confirmPassword'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirmer le mot de passe</FormLabel>
                            <FormControl>
                                <Input
                                    type='password'
                                    placeholder='Confirmer le mot de passe'
                                    {...field}
                                    required
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
                        className='w-full hover:cursor-pointer'
                    >
                        S'inscrire
                    </Button>
                    <SigninModal
                        register={registerFeedback}
                        onClose={resetForm}
                        onOpenChange={(open) => setShowRegisterModal(open)}
                        open={showRegisterModal}
                    />
                </div>
            </form>
        </Form>
    );
}
