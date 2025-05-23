import CapitalsQuestionCard from './Geography/CapitalsQuestionCard';
import FlagsQuestionCard from './Geography/FlagsQuestionCard';

import { useQuizStore } from '@/store/quiz-store';

export default function MultipleChoiceQuestionCard() {
    const quiz = useQuizStore((state) => state.quiz);
    const questions = quiz.questions;
    const currentQuestionIndex = useQuizStore(
        (state) => state.currentQuestionIndex
    );

    console.log(quiz)
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion.questionText.includes('capitale')) {
        return <CapitalsQuestionCard />;
    } else if (currentQuestion.questionText.includes('drapeau')) {
        return <FlagsQuestionCard />;
    }
}
