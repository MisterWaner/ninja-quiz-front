import ContentSection from '@/components/global/ContentSection';
import UpdatePasswordModal from '@/components/UserAccount/UpdatePwd/UpdatePasswordModal';
import DeletePasswordModal from "@/components/UserAccount/DeletePwd/DeletePasswordModal.tsx";

export default function AccountSettings() {
    return (
        <>
            <h2 className='text-3xl font-bold text-center mt-10'>Paramètres</h2>
            <ContentSection>
                <div className='w-full flex max-md:flex-col items-center gap-4 '>
                    <UpdatePasswordModal />
                    <DeletePasswordModal />
                </div>

            </ContentSection>
        </>
    );
}
