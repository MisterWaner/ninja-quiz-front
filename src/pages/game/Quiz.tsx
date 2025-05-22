//import { useState } from "react";
import { useParams } from 'react-router';
//import { useQuery } from "@tanstack/react-query";

import Wrapper from '@/components/global/Wrapper';
import ContentSection from '@/components/global/ContentSection';
import ScoreIndicator from '@/components/Quiz/ScoreIndicator';
import ProgressBar from '@/components/Quiz/ProgressBar';
import QuestionDisplayer from '@/components/Quiz/QuestionDisplayer';
import EndCard from '@/components/Quiz/Card/EndCard';

import { useQuizStore } from '@/store/quiz-store';

export default function Quiz() {
    const { type } = useParams();

    const progress = useQuizStore((state) => state.progress);
    const totalProgress = useQuizStore((state) => state.totalProgress);

    //const { getSubjectLists} = useQuizStore();
    const formattedTitle = type
        ? type
              .split('-')
              .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
              .join(' ')
        : '';

    return (
        <Wrapper>
            {progress === totalProgress ? (
                <>
                    <ContentSection>
                        <EndCard />
                    </ContentSection>
                    <ContentSection>
                        <ScoreIndicator />
                        <ProgressBar />
                    </ContentSection>
                </>
            ) : (
                <>
                    <h2 className='text-3xl font-bold text-center'>
                        {formattedTitle}
                    </h2>
                    <ContentSection>
                        <QuestionDisplayer />
                    </ContentSection>
                    <ContentSection>
                        <ScoreIndicator />
                        <ProgressBar />
                    </ContentSection>
                </>
            )}
        </Wrapper>
    );
}
