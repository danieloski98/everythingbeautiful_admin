import { CustomImage, ModalLayout } from "@/components/custom";
import { Spinner } from "@heroui/spinner";

export default function AccountVerified(
    { isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (by: boolean) => void }
) {


    return (
        <ModalLayout isOpen={isOpen} size="sm" onClose={() => setIsOpen(false)} >
            <div className=" w-full flex flex-col items-center gap-4 pt-4 justify-center " >
                <CustomImage src={"/images/logo.png"} width={120} height={38} alt="auth" />
                <div className=" flex flex-col items-center gap-1 " >
                    <p className=" text-2xl font-bold " >Signing In...</p>
                    <Spinner />
                </div>
            </div>
        </ModalLayout>
    )
}