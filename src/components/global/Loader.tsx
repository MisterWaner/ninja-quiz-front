import infiniteSpinner from '@/assets/infinite-spinner.svg';

export default function Loader() {
    return (
        <div className='flex justify-center items-center h-screen'>
            <img
                src={infiniteSpinner}
                className='w-24 h-24'
                alt='Chargement...'
            />
        </div>
    );
}
