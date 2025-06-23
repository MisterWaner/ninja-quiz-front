import { useQuery } from '@tanstack/react-query';
import {
    Table,
    TableBody,
    TableHeader,
    TableRow,
    TableCell,
    TableHead,
    TableFooter,
} from '@/components/ui/table';
import { getUserGlobalScoreByTheme } from '@/services/get-scores';
import useCurrentUser from '@/hooks/use-current-user';

export default function ScoreByTheme() {
    const { data: currentUser } = useCurrentUser();
    const userId = currentUser?.id;
    const { data: scores } = useQuery({
        queryKey: ['themes-scores', userId],
        queryFn: ({ queryKey }) =>
            getUserGlobalScoreByTheme({ userId: queryKey[1] }),
        enabled: !!userId,
        retry: false,
    });

    const total = scores?.reduce((acc, curr) => acc + Number(curr.totalScore), 0);
    
    return (
        <Table>
            <TableHeader className='bg-slate-950'>
                <TableRow>
                    <TableHead className='text-slate-50'>Thème</TableHead>
                    <TableHead className='text-slate-50'>Score</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {scores?.map(({ themeName, totalScore }, idx) => (
                    <TableRow key={idx}>
                        <TableCell>{themeName}</TableCell>
                        <TableCell>{totalScore}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter className='font-bold'>
                <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell>{total}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
