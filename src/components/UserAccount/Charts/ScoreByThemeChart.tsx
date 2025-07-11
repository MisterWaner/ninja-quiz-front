import { Bar, BarChart, XAxis } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getUserAverageScoreSortedByTheme } from '@/services/get-scores';
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

export default function ScoreByThemeChart() {
    const { data: currentUser } = useCurrentUser();
    const userId = currentUser?.id;

    const { data: averageScores } = useQuery({
        queryKey: ['average-scores-by-theme', userId],
        queryFn: ({ queryKey }) =>
            getUserAverageScoreSortedByTheme({ userId: queryKey[1] }),
        enabled: !!userId,
        retry: false,
    });

    const chartData =
        averageScores?.map(({ themeName, averageScore, totalScore }) => ({
            theme: themeName,
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
                <CardTitle>Ta moyenne par Thème</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className='min-h-96 w-full whitespace-nowrap'>
                    <ChartContainer
                        config={chartConfig}
                        className='min-h-96 w-full'
                    >
                        <BarChart accessibilityLayer data={chartData}>
                            <XAxis
                                dataKey='theme'
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) =>
                                    value.slice(0, 5) + '...'
                                }
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
