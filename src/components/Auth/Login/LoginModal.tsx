import { useNavigate } from 'react-router';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function LoginModal({
    login: { status, message, style },
    open,
    onOpenChange,
    onClose,
}: {
    login: {
        status: string;
        message: string;
        style: string;
        buttonStyle: string;
    };
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onClose: () => void;
}) {
    const navigate = useNavigate();

    function handleNavigate() {
        if (status === 'Connexion réussie') {
            navigate('/mon-compte');
        } else {
            navigate('/connexion');
        }
    }
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className={style}>{status}</DialogTitle>
                    <DialogDescription>{message}</DialogDescription>
                </DialogHeader>
                <DialogClose asChild>
                    <div className='flex h-full justify-end'>
                        <Button
                            className='w-1/3'
                            variant='destructive'
                            onClick={() => {
                                handleNavigate();
                                onOpenChange(false);
                                onClose();
                            }}
                        >
                            Fermer
                        </Button>
                    </div>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
}
