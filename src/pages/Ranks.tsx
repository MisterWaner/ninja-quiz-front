import ContentSection from '@/components/global/ContentSection';
import RanksTableCard from '@/components/Scores/RanksTableCard';
import DailyRanksTable from '@/components/Scores/DailyRanksTable';
import GlobalRanksTable from '@/components/Scores/GlobalRanksTable';

export default function Ranks() {
    return <>
        <h2 className="text-3xl font-bold text-center mt-10">
            Classements
        </h2>
        <div className="flex max-xl:flex-col gap-6">
            <ContentSection>
                <RanksTableCard
                    title="Classement du jour"
                    description="Classement des meilleurs scores du jour"
                    content={<DailyRanksTable />}
                />
            </ContentSection>
            <ContentSection>
                <RanksTableCard
                    title="Classement global"
                    description="Classement des meilleurs scores mensuels"
                    content={<GlobalRanksTable />}
                />
            </ContentSection>
        </div>
    </>;
}
