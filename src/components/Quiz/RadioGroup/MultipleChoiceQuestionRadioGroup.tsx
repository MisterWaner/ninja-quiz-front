import {Label} from '@/components/ui/label';
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {cn} from '@/lib/utils.ts'


type RadioOptionsGroupProps = {
    options: string[];
    selectedValue: string;
    onChange: (value: string) => void;
    timer: number;
    label?: string;
    className?: string;
}

export default function MultipleChoiceQuestionRadioGroup(
    {
        options,
        selectedValue,
        onChange,
        timer,
        label = 'Ta réponse :',
        className
    }: RadioOptionsGroupProps) {
    return (
        <RadioGroup className={cn('lg:w-1/2', className)} value={selectedValue} onValueChange={onChange}>
            <Label className='mt-10 md:mt-4'>{label} </Label>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4'>
                {options.map((option, index) => (
                    <div className='flex items-center space-x-4' key={index}>
                        <RadioGroupItem
                            value={option}
                            id={option}
                            disabled={timer === 0}
                            className='cursor-pointer'
                        />
                        <Label htmlFor={option} className='cursor-pointer'>
                            {option}
                        </Label>
                    </div>
                ))}
            </div>
        </RadioGroup>
    )
}
