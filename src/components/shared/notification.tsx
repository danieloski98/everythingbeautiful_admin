import { URLS } from "@/helper/services/urls";
import { useFetchData } from "@/hooks/useFetchData";

export default function Notification() { 

    const { data, isLoading } = useFetchData<any>({
        endpoint: URLS.NOTIFICATION(""),
        name: ["notification"],  
    })

    return (
        <div className=" w-full h-full relative ">
            <div className=" w-full h-[80px] top-0 sticky px-6 border-b border-bordercolor flex items-center ">
                <p className=" text-2xl font-bold ">Notification</p>
            </div>
            <div className=" w-full h-full flex justify-center py-10 ">
                <div className=" max-w-[740px] h-fit relative flex gap-4 p-6 rounded-2xl w-full border-bordercolor border-b ">
                    <div className=" w-fit ">
                        <div className=" w-[42px] h-[42px] rounded-full bg-amber-300 " />
                    </div>
                    <div className=" flex flex-col gap-2 ">
                        <p className=" text-sm text-[#444444] ">
                            Please confirm your email address by clicking on the
                            link we just emailed you. If you cannot find the
                            email, you can request a new confirmation email or
                            change your email address.
                        </p>
                        <p className=" text-xs text-[#747474] ">23 /11/2025</p>
                    </div>
                    <div className=" w-2 h-2 rounded-full bg-brand absolute top-4 right-4 " />
                </div>
            </div>
        </div>
    );
}
