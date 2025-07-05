import {useNavigate} from "react-router";
import {useState} from "react";
import {CircleCheck, XCircle} from "lucide-react";
import {
    Dialog,
    DialogHeader,
    DialogTrigger,
    DialogTitle,
    DialogContent,
    DialogDescription,
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {deleteUser} from "@/services/user-services.ts";
import useCurrentUser from "@/hooks/use-current-user.ts";

export default function DeletePasswordModal() {
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const {data: user} = useCurrentUser()
    const navigate = useNavigate();

    async function handleDelete() {
        await deleteUser(user?.id)
        setTimeout(() => navigate('/'), 2000)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='hover:cursor-pointer w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6'>
                    Supprimer mon compte
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='font-bold text-red-500'>Supprimer mon compte</DialogTitle>
                    <div className='text-sm'>
                        <p>Es-tu sûr de vouloir supprimer ton compte ?</p>
                        <p>Attention cette action est <span
                            className='font-bold text-red-500 uppercase'>définitive </span> !
                        </p>
                    </div>
                </DialogHeader>

                {status === 'idle' && (
                    <div className='w-full flex items-center justify-between gap-4'>
                        <Button className='w-1/2'>Annuler</Button>
                        <Button variant="destructive" className='w-1/2' onClick={handleDelete}>Supprimer</Button>
                    </div>
                )}

                {status === "success" && (
                    <div className='flex flex-col items-center gap-4 py-8'>
                        <CircleCheck/>
                        <p className='text-center text-lg'>
                            Ton compte a été supprimé avec sucès !
                        </p>
                    </div>
                )}

                {status === 'error' && (
                    <div className='flex flex-col items-center gap-4 py-8'>
                        <XCircle/>
                        <p className='text-center text-lg'>
                            Échec de la suppression de votre compte.
                        </p>
                        <Button onClick={() => setStatus('idle')}>Réessayer</Button>
                    </div>
                )}

            </DialogContent>
        </Dialog>
    );
}
