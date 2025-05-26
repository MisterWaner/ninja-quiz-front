//import { useQuery } from '@tanstack/react-query';
import {
    Table,
    TableBody,
    TableHeader,
    TableRow,
    TableCell,
    TableHead,
    TableCaption,
} from '@/components/ui/table';

export default function DailyRanksTable() {
    return (
        <Table>
            <TableCaption>
                Ce tableau est mis à jour toutes les heures
            </TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Position</TableHead>
                    <TableHead>Pseudo</TableHead>
                    <TableHead>Score</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>John</TableCell>
                    <TableCell>100</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
