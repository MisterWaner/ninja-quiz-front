import { useQuery } from '@tanstack/react-query';
import {
    Table,
    TableBody,
    TableHeader,
    TableRow,
    TableCell,
    TableHead,
    TableCaption,
} from '@/components/ui/table';
import { getGLobalScores } from '@/services/get-scores';

export default function GlobalRanksTable() {
    const { data } = useQuery({
        queryKey: ['scores'],
        queryFn: getGLobalScores,
    });

    return (
        <Table>
            <TableCaption>
                {data ? `` : "Pas de score aujourd'hui"}
            </TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Position</TableHead>
                    <TableHead>Pseudo</TableHead>
                    <TableHead>Score</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map(({ username, totalScore }, idx) => (
                    <TableRow key={idx}>
                        <TableCell>{idx + 1}</TableCell>
                        <TableCell>{username}</TableCell>
                        <TableCell>{totalScore}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
