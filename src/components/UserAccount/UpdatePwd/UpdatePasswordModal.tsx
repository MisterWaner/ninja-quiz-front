import {useState} from "react";
import {CircleCheck, XCircle} from "lucide-react";
import {
    Dialog,
    DialogHeader,
    DialogTrigger,
    DialogContent,
    DialogTitle,
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import UpdatePasswordForm from './UpdatePasswordForm';

export default function UpdatePasswordModal() {
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

    return (
        <Dialog onOpenChange={(open) => {
            if (!open) setStatus('idle');
        }}>
            <DialogTrigger asChild>
                <Button className='hover:cursor-pointer'>
                    Modifier le mot de passe
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Modifier le mot de passe</DialogTitle>
                </DialogHeader>
                {status === 'idle' && (
                    <UpdatePasswordForm onStatusChange={setStatus}/>
                )}

                {status === 'success' && (
                    <div className='flex flex-col items-center gap-4 py-8'>
                        <CircleCheck/>
                        <p className='text-center text-lg'>
                            Mot de passe modifié avec succès !
                        </p>
                    </div>
                )}

                {status === 'error' && (
                    <div className='flex flex-col items-center gap-4 py-8'>
                        <XCircle/>
                        <p className='text-center text-lg'>
                            Échec de la modification du mot de passe.
                        </p>
                        <Button onClick={() => setStatus('idle')}>Réessayer</Button>
                    </div>
                )}

            </DialogContent>
        </Dialog>
    );
}
