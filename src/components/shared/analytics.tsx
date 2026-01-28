"use client"
import { IAnalytic, IAnalyticLabel } from "@/helper/model/analytice";
import { URLS } from "@/helper/services/urls";
import { formatNumber } from "@/helper/utils/numberFormat";
import { useFetchData } from "@/hooks/useFetchData";
import { getKeyValue } from "@heroui/react"; 
import LoadingLayout from "./loadingLayout";


export default function Analytics(
    { labels }: { labels: IAnalyticLabel[] | [] }
) {

    const { data, isLoading } = useFetchData<IAnalytic>({
        endpoint: URLS.ANALYTICS,
        name: ["analytics"],
    }) 

    return (
        <div className=" w-full h-fit " >
            <div className=" w-full h-[193px] flex bg-white shadow rounded-2xl py-2 " >
                <LoadingLayout loading={isLoading} >
                    {labels.map((item, index) => {

                        const value = getKeyValue(data, item.key)

                        return (
                            <div key={index} className={`${labels.length === index + 1 ? "" : " border-r border-[#E7EAEE] "} w-full flex flex-col p-6 `} >
                                <div className=" flex flex-col gap-2 " >
                                    <div style={{ backgroundColor: item?.color ?? "#9747FF" }} className={` w-[46px] h-[46px] rounded-full flex flex-col justify-center items-center gap-3 `} >
                                        <item.icon size={"20px"} color="white" />
                                    </div>
                                    <p className=" font-semibold text-sm " >{item?.label}</p>
                                </div>
                                <div className=" w-full flex justify-between mt-auto items-center " >
                                    <p className=" font-bold text-3xl " >{formatNumber(value ?? 0, "")}</p>
                                    <p className=" text-xs text-secondary font-medium " ><span className=" text-green-600 " >2+</span> in last week</p>
                                </div>
                            </div>
                        )
                    })}
                </LoadingLayout>
            </div>
        </div>
    )
}