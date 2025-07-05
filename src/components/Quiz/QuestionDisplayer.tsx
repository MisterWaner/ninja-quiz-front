import DirectQuestionCard from './Card/DirectQuestionCard';
import MultipleChoiceQuestionCard from './Card/MultipleChoiceQuestionCard';
import TrueOrFalseQuestionCard from './Card/TrueOrFalseQuestionCard';

import { useQuizStore } from '@/store/quiz-store';

export default function QuestionDisplayer() {
    const questionType = useQuizStore((state) => state.questionType);

    switch (questionType) {
        case 'direct':
            return <DirectQuestionCard />;
        case 'multiple':
            return <MultipleChoiceQuestionCard displayImage={true}/>;
        case 'trueOrFalse':
            return <TrueOrFalseQuestionCard />;
        default:
            return null;
    }
}
