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

export default function SigninModal({
    register: { status, message, style },
    open,
    onOpenChange,
    onClose,
}: {
    register: {
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
        if (status === 'Inscription réussie') {
            navigate('/connexion');
        } else {
            navigate('/inscription');
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
