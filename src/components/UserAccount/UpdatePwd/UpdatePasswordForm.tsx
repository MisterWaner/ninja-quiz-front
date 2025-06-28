import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';
import {LoaderCircle} from 'lucide-react';

import {
    Form,
    FormControl,
    FormLabel,
    FormItem,
    FormField,
    FormMessage,
} from '@/components/ui/form';
import {updatePasswordSchema} from '@/lib/zod-schemas';
import {Input} from '@/components/ui/input';
import {useAuthActions} from "@/store/auth-action.ts";
import {useAuthStore} from '@/store/auth-store';
import {Button} from '@/components/ui/button';
import {toast} from "sonner";
import type {User} from "@/types/types.ts";

type UpdatePasswordFormProps = {
    onStatusChange: (status: 'success' | 'error') => void;
}

export default function UpdatePasswordForm({onStatusChange}: UpdatePasswordFormProps) {
    const form = useForm<z.infer<typeof updatePasswordSchema>>({
        resolver: zodResolver(updatePasswordSchema),
    });

    const currentUser = useAuthStore(state => state.currentUser);
    const updatePassword = useAuthActions(state => state.updatePassword);
    console.log('updatePassword from store:', updatePassword);
    const updateMutation = useMutation({
        mutationFn: ({id, password}: { id: User['id'], password: User['password'] }) => {
            // The updatePassword function expects userId and password
            return updatePassword(id, password);
        },
        onSuccess: () => {
            onStatusChange('success');
            console.log('Successfully updated password')
        },
        onError: (error) => {
            onStatusChange('error');
            console.error('Error updating password:', error);
        }
    });

    async function handleUpdatePassword(
        values: z.infer<typeof updatePasswordSchema>
    ) {
        console.log('currentUser:', currentUser)
        if (!currentUser) {
            toast.error('Utilisateur non connecté');
            return;
        }
        updateMutation.mutate({
            id: currentUser.id,
            password: values.password,
        })
        console.log(values)
    }

    return (
        <Form {...form}>
            <form
                className='flex flex-col gap-4'
                onSubmit={form.handleSubmit(handleUpdatePassword)}
            >
                <FormField
                    name='password'
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Nouveau mot de passe</FormLabel>
                            <FormControl>
                                <Input
                                    type='password'
                                    placeholder='Mot de passe'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    name='confirmPassword'
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Confirmer le mot de passe</FormLabel>
                            <FormControl>
                                <Input
                                    type='password'
                                    placeholder='Confirmer le mot de passe'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <div className='flex justify-end'>
                    <Button
                        type='submit'
                        className='w-full sm:w-3/6 hover:cursor-pointer'
                        disabled={!form.formState.isValid || updateMutation.isPending}
                    >
                        {updateMutation.isPending ? (
                            <LoaderCircle className='animate-spin'/>
                        ) : (
                            'Enregistrer'
                        )}

                    </Button>
                </div>
            </form>
        </Form>
    );
}
