import {
    Table,
    TableBody,
    TableHeader,
    TableRow,
    TableCell,
    TableHead,
} from '@/components/ui/table';

export default function ScoreByTheme() {
    return (
        <Table>
            <TableHeader className='bg-slate-400/50'>  
                <TableRow>
                    <TableHead>Sujet</TableHead>
                    <TableHead>Thème</TableHead>
                    <TableHead>Score</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>Mathématiques</TableCell>
                    <TableCell>Addition</TableCell>
                    <TableCell>100</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Science</TableCell>
                    <TableCell>Physique</TableCell>
                    <TableCell>80</TableCell>
                </TableRow>
                <TableRow className='font-bold'>
                    <TableCell>Total</TableCell>
                    <TableCell>180</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
