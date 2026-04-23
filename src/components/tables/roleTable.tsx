"use client"
import { CustomTable } from "../custom";
import { useFetchData } from "@/hooks/useFetchData";
import { URLS } from "@/helper/services/urls";
import { dateFormat } from "@/helper/utils/dateFormat"; 
import { useEffect, useState } from "react";
import { IPagination } from "@/helper/model/pagination";
import { Column } from "@/helper/model/table";   
import { IRole } from "@/helper/model/admin"; 
// import { searchAtom } from "@/store/search";
// import { useAtom } from "jotai";


export default function RoleTable() {

    // const [ search ] = useAtom(searchAtom)
    const [page, setPage] = useState<number>(1)
    const [limit, setLimt] = useState<string>("10") 
    const [dataInfo, setDataInfo] = useState<IRole[]>([]) 

    const { data, isLoading } = useFetchData<IPagination<IRole[]>>({
        endpoint: URLS.ROLE,
        name: ["roles"],
        pagination: true,
        params: {
            limit: Number(limit),
            page: page
        }
    })   

    useEffect(() => {
        if (Array.isArray(data?.data) && data?.data.length > 0) {
            setDataInfo(data.data as unknown as IRole[]);
        } else {
            setDataInfo([]);
        }
    }, [data?.data, isLoading]);

    const adminColumn: Column<IRole>[] = [
        {
            key: "name",
            label: "Name", 
        },
        {
            key: null,
            label: "Access",
            type: "custom",
            render: (item) => {
                return (
                    <div className=" w-fit px-3 flex flex-wrap " >
                        {item?.permissions?.map((subitem, index) => {
                            return(
                                <div key={index} className={` flex items-center capitalize justify-center h-5 border-[#DDE6EB] px-2 ${item?.permissions?.length !== index+1 ? " border-r " : " " } `} >
                                    {subitem?.replace("_", " ")}
                                </div>
                            )
                        })}
                    </div>
                )
            }
        }, 
        {
            key: "createdAt",
            label: "Date Created",
            type: "custom",
            render: (item) => {
                return (
                    <div className=" w-fit rounded-full py-1 px-3 border-[#DDE6EB] border " >
                        {dateFormat(item?.createdAt)}
                    </div>
                )
            }
        }, 
    ]

    return (
        <div className="w-full flex flex-col">
            <CustomTable
                columns={adminColumn}
                rows={
                    dataInfo?.map((row) => ({
                        key: row?._id,
                        ...row
                    }))
                }
                isLoading={isLoading}
                page={page}
                setPage={setPage}
                limit={limit}
                setLimit={setLimt}
                total={data?.total ?? 0}
            /> 
        </div>
    )
} 
