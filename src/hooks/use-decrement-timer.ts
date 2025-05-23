import { useEffect } from 'react';
import { useQuizStore } from '@/store/quiz-store';

export default function useDecrementTimer() {
    const { isTimerRunning, decrementTimer } = useQuizStore();

    useEffect(() => {
        let intervalID: NodeJS.Timeout;

        if (isTimerRunning) {
            intervalID = setInterval(() => {
                decrementTimer();
            }, 1000);
        }

        return () => {
            clearInterval(intervalID);
        };
    }, [isTimerRunning, decrementTimer]);
}