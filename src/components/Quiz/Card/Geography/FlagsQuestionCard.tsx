import useDecrementTimer from '@/hooks/use-decrement-timer';

import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import NextQuestionModal from '@/components/Quiz/Modals/NextQuestionModal';
import FlagsRadioGroup from '@/components/Quiz/RadioGroup/FlagsRadioGroup';
import Timer from '@/components/Quiz/Timer';

import { useQuizStore } from '@/store/quiz-store';

export default function FlagsQuestionCard() {
    const { isTimerRunning, startTimer, resetTimer } = useQuizStore();

    const quiz = useQuizStore((state) => state.quiz);
    const timer = useQuizStore((state) => state.timer);
    const currentQuestionIndex = useQuizStore(
        (state) => state.currentQuestionIndex
    );

    const questions = quiz.questions;

    useDecrementTimer();

    const currentQuestion = questions[currentQuestionIndex];

    function handleResetTimer() {
        resetTimer();
    }

    function handleRadioInput(value: string) {
        useQuizStore.setState({
            userAnswer: value,
        });
    }

    return (
        <Card
            className='md:w-1/2 mx-auto mt-24'
            onMouseEnter={() => {
                if (!isTimerRunning && timer > 0) startTimer(timer);
            }}
        >
            <CardHeader>
                <CardTitle>Question {currentQuestionIndex + 1}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className='text-sm italic flex items-center gap-4'>
                    <span>{currentQuestion?.questionText}</span>
                    {currentQuestion?.imageUrl && (
                        <img
                            src={currentQuestion.imageUrl}
                            alt={`Drapeau de ${currentQuestion.correctAnswer}`}
                            className='w-32 h-20 '
                        />
                    )}
                </div>
                <Label className='mt-4'>Ta réponse :</Label>

                <FlagsRadioGroup handleRadioInput={handleRadioInput} />
                <Timer />
            </CardContent>
            <CardFooter className='justify-end'>
                <NextQuestionModal handleResetTimer={handleResetTimer} />
            </CardFooter>
        </Card>
    );
}
