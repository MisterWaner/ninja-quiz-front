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
import { getUserGlobalScoreBySubject } from '@/services/get-scores';
import useCurrentUser from '@/hooks/use-current-user';

export default function ScoreBySubject() {
    const { data: currentUser } = useCurrentUser();
    const userId = currentUser?.id;
    const { data: scores } = useQuery({
        queryKey: ['subjects-scores', userId],
        queryFn: ({ queryKey }) =>
            getUserGlobalScoreBySubject({ userId: queryKey[1] }),
        enabled: !!userId,
        retry: false,
    });

    const total = scores?.reduce((acc, curr) => acc + Number(curr.totalScore), 0);
    
    return (
        <Table>
            <TableHeader className='bg-slate-950'>
                <TableRow>
                    <TableHead className='text-slate-50'>Sujet</TableHead>
                    <TableHead className='text-slate-50'>Score</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {scores?.map(({ subjectName, totalScore }, idx) => (
                    <TableRow key={idx}>
                        <TableCell>{subjectName}</TableCell>
                        <TableCell>{totalScore}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter className='font-bold'>
                <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell>
                        {total}
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
