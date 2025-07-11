import { useQuery } from '@tanstack/react-query';
import { Bar, BarChart, XAxis } from 'recharts';
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { getUserAverageScoreSortedBySubject } from '@/services/get-scores';
import useCurrentUser from '@/hooks/use-current-user';

const chartConfig = {
    total: {
        label: 'Total',
        color: '#020617',
    },
    average: {
        label: 'Moyenne',
        color: '#64748b',
    },
} satisfies ChartConfig;

export default function ScoreBySubjectChart() {
    const { data: currentUser } = useCurrentUser();
    const userId = currentUser?.id;

    const { data: averageScores } = useQuery({
        queryKey: ['userAverageScoreSortedBySubject', userId],
        queryFn: () => getUserAverageScoreSortedBySubject({ userId }),
        enabled: !!userId,
    });

    const chartData =
        averageScores?.map(({ subjectName, averageScore, totalScore }) => ({
            sujet: subjectName,
            Moyenne: averageScore,
            Total: totalScore,
        })) || [];
    
    if (!chartData.length) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Pas de données disponibles</CardTitle>
                </CardHeader>
                <CardContent>
                    Aucune donnée disponible pour afficher le graphique.
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Ta moyenne par Sujet</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className='min-h-96 w-full whitespace-nowrap'>
                    <ChartContainer
                        config={chartConfig}
                        className='min-h-96 w-full'
                    >
                        <BarChart accessibilityLayer data={chartData}>
                            <XAxis
                                dataKey='sujet'
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent />}
                            />
                            <Bar
                                dataKey='Total'
                                fill='var(--color-total)'
                                radius={4}
                            />
                            <Bar
                                dataKey='Moyenne'
                                fill='var(--color-average)'
                                radius={4}
                            />
                        </BarChart>
                    </ChartContainer>
                    <ScrollBar orientation='horizontal' />
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
