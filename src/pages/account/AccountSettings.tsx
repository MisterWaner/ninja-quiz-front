import ContentSection from '@/components/global/ContentSection';
import UpdatePasswordModal from '@/components/UserAccount/UpdatePwd/UpdatePasswordModal';

export default function AccountSettings() {
    return (
        <>
            <h2 className='text-3xl font-bold text-center mt-10'>Paramètres</h2>
            <ContentSection>
                <UpdatePasswordModal />
            </ContentSection>
        </>
    );
}
