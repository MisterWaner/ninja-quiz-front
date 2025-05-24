import { Progress } from '@/components/ui/progress';
import { useQuizStore } from '@/store/quiz-store';

export default function ProgressBar() {
    const progress = useQuizStore((state) => state.progress);

    return (
        <>
            <Progress value={progress} className='md:w-2/3 lg:w-1/2 h-4 mx-auto mt-10' />
            <div className='mt-2 text-2xl font-bold text-center'>
                {progress}%
            </div>
        </>
    );
}
