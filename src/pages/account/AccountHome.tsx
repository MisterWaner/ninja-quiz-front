import ContentSection from '@/components/global/ContentSection';
import ninjaQuiz from '/ninjaquiz.png';
import ScoreBySubject from '@/components/UserAccount/ScoreBySubject';
import RanksTableCard from '@/components/Scores/RanksTableCard';
import ScoreByTheme from '@/components/UserAccount/ScoreByTheme';
import useCurrentUser from '@/hooks/use-current-user';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';

export default function AccountHome() {
    const { data: user } = useCurrentUser();

    return (
        <>
            <h2 className='text-3xl font-bold text-center mt-10'>Bonjour {user?.username}</h2>
            <ContentSection>
                <div className='mt-20 flex flex-col items-center justify-center md:flex-row'>
                    <img
                        src={ninjaQuiz}
                        alt=''
                        className='w-3/6 md:w-1/4 select-none'
                        onClick={(e) => e.preventDefault()}
                    />
                </div>
            </ContentSection>
            <div className="flex flex-col md:flex-row md:gap-4">
                <ContentSection>
                    <RanksTableCard
                        title="Résultats par sujet"
                        description="Tes scores par sujet"
                        content={<ScoreBySubject />}
                    />
                </ContentSection>
                <ContentSection>
                    <RanksTableCard
                        title="Résultats par thème"
                        description="Tes scores par thème"
                        content={<ScoreByTheme />}
                    />
                </ContentSection>
            </div>
            <ContentSection>
                <Button asChild className='w-full md:w-96'>
                    <Link to='/jouer'>
                        Jouer
                    </Link>
                </Button>
            </ContentSection>
        </>
    );
}
