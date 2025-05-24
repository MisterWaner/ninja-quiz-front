import { useNavigate } from 'react-router';
import { RotateCcw, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogAction,
} from '@/components/ui/alert-dialog';

import { useQuizStore } from '@/store/quiz-store';

export default function SaveScoreModal() {
    const {
        resetScore,
        resetTimer,
        resetQuiz,
        resetProgress,
        incrementSessionScore,
    } = useQuizStore();
    const score = useQuizStore((state) => state.score);

    const navigate = useNavigate();

    function handleSaveScoreInLocalStorage() {
        let savedScore = localStorage.getItem('score');
        if (savedScore) {
            const integerSavedScore = Number(savedScore);
            savedScore = (integerSavedScore + score).toString();
            localStorage.setItem('score', savedScore);
            return savedScore;
        } else {
            return localStorage.setItem('score', score.toString());
        }
    }

    function handleSaveScore() {
        console.log(score);
        incrementSessionScore();
        handleSaveScoreInLocalStorage();
        resetScore();
        resetTimer();
        resetProgress();
        resetQuiz();
        navigate('/jouer');
    }

    function handleRestartQuiz() {
        incrementSessionScore();
        handleSaveScoreInLocalStorage();
        resetScore();
        resetTimer();
        resetProgress();
        resetQuiz();
        navigate('/jouer');
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className='font-semibold sm:w-3/6 w-full cursor-pointer'>
                    Enregistrer mon score
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Ton score a été enregistré !
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter className='flex flex-col gap-2'>
                    <AlertDialogAction asChild>
                        <Button
                            className='font-semibold w-full sm:w-3/6 cursor-pointer'
                            onClick={() => handleRestartQuiz()}
                        >
                            Recommencer
                            <RotateCcw className='ml-2 h-4 w-4' />
                        </Button>
                    </AlertDialogAction>
                    <AlertDialogAction asChild>
                        <Button
                            className='font-semibold w-full sm:w-3/6 cursor-pointer'
                            onClick={() => handleSaveScore()}
                        >
                            Tous les quiz
                            <List className='ml-2 h-4 w-4' />
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
