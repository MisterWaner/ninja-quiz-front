import useDecrementTimer from '@/hooks/use-decrement-timer';

import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Timer from '@/components/Quiz/Timer';
import NextQuestionModal from '@/components/Quiz/Modals/NextQuestionModal';

import { useQuizStore } from '@/store/quiz-store';

export default function DirectQuestionCard() {
    const { isTimerRunning, startTimer, resetTimer } = useQuizStore();

    const userAnswer = useQuizStore((state) => state.userAnswer);
    const quiz = useQuizStore((state) => state.quiz);
    const timer = useQuizStore((state) => state.timer);
    const currentQuestionIndex = useQuizStore(
        (state) => state.currentQuestionIndex
    );

    const questions = quiz.questions;

    useDecrementTimer();

    if (!questions || questions.length === 0) return null;

    const currentQuestion = questions[currentQuestionIndex];

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;

        useQuizStore.setState({
            userAnswer: value,
        });
    }

    function handleResetTimer() {
        resetTimer();
    }

    return (
        <Card
            className='md:w-2/3 lg:w-1/2 mx-auto mt-24'
            onMouseEnter={() => {
                if (!isTimerRunning && timer > 0) startTimer(timer);
            }}
        >
            <CardHeader>
                <CardTitle>Question {currentQuestionIndex + 1}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className='text-sm italic whitespace-pre-line'>
                    {currentQuestion.questionText}
                </p>
                <div className='grid grid-cols-1 sm:grid-cols-3 items-center gap-4 mt-4'>
                    <Label>Ta réponse :</Label>
                    <Input
                        type='text'
                        className='col-span-2'
                        placeholder='Réponse'
                        onChange={handleInputChange}
                        value={userAnswer as string}
                        disabled={timer === 0}
                        tabIndex={0}
                    />
                </div>
                <Timer />
            </CardContent>
            <CardFooter className='justify-end'>
                <NextQuestionModal handleResetTimer={handleResetTimer} />
            </CardFooter>
        </Card>
    );
}
