import ContentSection from '@/components/global/ContentSection';
import SigninCard from '@/components/Auth/Signin/SigninCard';

export default function Signin() {
    return (
        <ContentSection>
            <h2 className='text-3xl font-bold text-center mt-10'>
                Inscription
            </h2>
            <div className='flex flex-col justify-center items-center'>
                <SigninCard />
            </div>
        </ContentSection>
    );
}
