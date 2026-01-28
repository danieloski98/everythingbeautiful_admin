"use client"
import { CustomTable } from "../custom";
import { useFetchData } from "@/hooks/useFetchData";
import { URLS } from "@/helper/services/urls";
import { dateFormat } from "@/helper/utils/dateFormat";
import { textLimit } from "@/helper/utils/textlimit"; 
import { useEffect, useState } from "react";
import { IPagination } from "@/helper/model/pagination";
import { Column } from "@/helper/model/table"; 
import { DeleteBtn, DrawerLayout } from "../shared"; 
import { UserInfo } from "../modals"; 
import { IAdmin } from "@/helper/model/admin";
import AdminInfo from "../modals/information/adminInfo";
// import { searchAtom } from "@/store/search";
// import { useAtom } from "jotai";


export default function AdminTable() {

    // const [ search ] = useAtom(searchAtom)
    const [page, setPage] = useState<number>(1)
    const [limit, setLimt] = useState<string>("10")
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [dataInfo, setDataInfo] = useState<IAdmin[]>([])
    const [selectedData, setSelectedData] = useState<IAdmin | null>(null)

    const { data, isLoading } = useFetchData<IPagination<IAdmin[]>>({
        endpoint: URLS.ADMIN,
        name: ["admin"],
        pagination: true,
        params: {
            limit: Number(limit),
            page: page
        }
    }) 
    

    const handleOpen = (item: IAdmin) => {
        setSelectedData(item)
        setIsOpen(true)
    }

    useEffect(() => {
        if (Array.isArray(data?.data) && data?.data.length > 0) {
            setDataInfo(data.data as unknown as IAdmin[]);
        } else {
            setDataInfo([]);
        }
    }, [data?.data, isLoading]);

    const adminColumn: Column<IAdmin>[] = [
        {
            key: null,
            label: "Username",
            type: "custom",
            render: (item) => {
                // Accept any type to match Column generic
                return (
                    <p className=" font-semibold capitalize " >
                        {textLimit(
                            // Safely access user fields, fallback to empty string if missing
                            (item?.fullname ?? "").trim(),
                            20
                        )}
                    </p>
                )
            }
        },
        {
            key: "email",
            label: "Email",
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
        {
            key: "role",
            label: "Role"
        },
        {
            key: null,
            label: "Access",
            type: "custom",
            render: (item) => {
                return (
                    <div className=" w-fit rounded-full py-[6px] px-3 border-[#DDE6EB] border " >
                        {item?.access?.map((subitem, index) => {
                            return(
                                <div key={index} className={` flex items-center justify-center h-5 border-[#DDE6EB] px-2 ${item?.access?.length !== index+1 ? " border-r " : " " } `} >
                                    {subitem}
                                </div>
                            )
                        })}
                    </div>
                )
            }
        },
        {
            key: null,
            type: "custom",
            label: "Action",
            render: (item) => {
                return (
                    <button onClick={() => handleOpen(item)} className=" text-sm font-semibold text-blue-500 " >View</button>
                )
            }
        }
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
            <DrawerLayout isOpen={isOpen} setIsOpen={setIsOpen} title="Admin Information" footerchildren={
                <DeleteBtn onClose={setIsOpen} type="admin" id={selectedData?._id as string}  />
            } >
                <AdminInfo {...selectedData as IAdmin} /> 
            </DrawerLayout>
        </div>
    )
} 
