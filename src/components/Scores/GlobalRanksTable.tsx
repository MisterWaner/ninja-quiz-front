import {
    Table,
    TableBody,
    TableHeader,
    TableRow,
    TableCell,
    TableHead,
    TableCaption,
} from '@/components/ui/table';

export default function GlobalRanksTable() {
    return (
        <Table>
            <TableCaption>
                Ce tableau est remis à 0 tous les mois
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
