import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useQuizStore } from '@/store/quiz-store';
import type { Theme } from '@/types/types';

export default function ThemeSelector() {
    const { getSubjectLists, getQuizData, setTimer } = useQuizStore();

    const { data } = useQuery({
        queryKey: ['subjects'],
        queryFn: getSubjectLists,
    });
    
    return (
        <div className='mt-4 flex flex-col md:flex-row gap-4 md:w-2/4'>
            {data?.map(({ name, id, themes, subjectPath }) => (
                <DropdownMenu key={id}>
                    <DropdownMenuTrigger asChild className='font-bold'>
                        <Button className='md:w-96 cursor-pointer'>
                            {name}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='md:w-96 w-56' align='start'>
                        {themes.sort((a, b) => a.name.localeCompare(b.name)).map(({ name, id, themePath }: Theme) => (
                            <DropdownMenuItem key={id}>
                                <Link
                                    to={`${themePath}`}
                                    className='cursor-pointer'
                                    onClick={() => {
                                        getQuizData({ subjectPath, themePath });
                                        setTimer(15);
                                    }}
                                >
                                    {name.charAt(0).toUpperCase() +
                                        name.slice(1)}
                                </Link>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            ))}
        </div>
    );
}
