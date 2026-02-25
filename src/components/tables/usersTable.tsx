"use client"
import { CustomTable } from "../custom";
import { useFetchData } from "@/hooks/useFetchData";
import { URLS } from "@/helper/services/urls";
import { dateFormat } from "@/helper/utils/dateFormat";
import { textLimit } from "@/helper/utils/textlimit";
import { IUserDetail } from "@/helper/model/user";
import { useEffect, useState } from "react";
import { IPagination } from "@/helper/model/pagination";
import { Column } from "@/helper/model/table"; 
import { DeleteBtn, DrawerLayout } from "../shared"; 
import { UserInfo } from "../modals"; 
import { useAtom } from "jotai";
import { searchAtom } from "@/store/search";
// import { searchAtom } from "@/store/search";
// import { useAtom } from "jotai";


export default function UserTable() {

    // const [ search ] = useAtom(searchAtom)
    const [page, setPage] = useState<number>(1)
    const [limit, setLimt] = useState<string>("10")
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [dataInfo, setDataInfo] = useState<IUserDetail[]>([])
    const [selectedData, setSelectedData] = useState<IUserDetail | null>(null)
    const [search] = useAtom(searchAtom);

    const { data, isLoading } = useFetchData<IPagination<IUserDetail[]>>({
        endpoint: URLS.USER,
        name: ["user"],
        pagination: true,
        params: {
            limit: Number(limit),
            page: page,
            search
        }
    })

    const handleOpen = (item: IUserDetail) => {
        setSelectedData(item)
        setIsOpen(true)
    }

    useEffect(() => {
        if (Array.isArray(data?.data) && data?.data.length > 0) {
            setDataInfo(data.data as unknown as IUserDetail[]);
        } else {
            setDataInfo([]);
        }
    }, [data?.data, isLoading]);

    const userColumn: Column<IUserDetail>[] = [
        {
            key: null,
            label: "Name",
            type: "custom",
            render: (item) => {
                // Accept any type to match Column generic
                return (
                    <p className=" font-semibold capitalize " >
                        {textLimit(
                            // Safely access user fields, fallback to empty string if missing
                            ((item?.firstName ?? "") + " " + (item?.lastName ?? "")).trim(),
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
            key: null,
            label: "Profile type",
            type: "custom",
            render: (item) => {
                return (
                    <div className={` w-fit rounded-2xl py-1 px-3 ${item?.business?._id ? " bg-[#F5F4FD] text-[#4F46E5] " : " bg-[#FEF1E6] text-[#FF8D28] "} text-sm font-medium flex items-center gap-2 `} >
                        <div className={` w-[6px] h-[6px] rounded-full ${item?.business?._id ? " bg-[#4F46E5] " : " bg-[#FF8D28] "} `} />
                        <p>{item?.business?._id ? "Business" : "Personal"}</p>
                    </div>
                )
            }
        },
        {
            key: "createdAt",
            label: "Date Joined",
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
            key: null,
            type: "custom",
            label: "Action",
            render: (item: IUserDetail) => {
                return (
                    <button onClick={() => handleOpen(item)} className=" text-sm font-semibold text-blue-500 " >View</button>
                )
            }
        }
    ]

    return (
        <div className="w-full flex flex-col">
            <CustomTable
                columns={userColumn}
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
            <DrawerLayout isOpen={isOpen} setIsOpen={setIsOpen} title="User Information" footerchildren={
                <DeleteBtn onClose={setIsOpen} type="user" id={selectedData?._id as string}  />
            } >
                <UserInfo setIsOpen={setIsOpen} user={selectedData as IUserDetail} />
            </DrawerLayout>
        </div>
    )
} 
