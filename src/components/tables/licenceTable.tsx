"use client";
import { CustomTable } from "../custom";
import { useFetchData } from "@/hooks/useFetchData";
import { URLS } from "@/helper/services/urls";
import { dateFormat } from "@/helper/utils/dateFormat";
import { useEffect, useState } from "react";
import { IPagination } from "@/helper/model/pagination";
import { Column } from "@/helper/model/table";
import { IBusinessDetails } from "@/helper/model/business"; 
import { PiSealCheckFill } from "react-icons/pi";
import { LicenceInfo } from "../modals";
// import { searchAtom } from "@/store/search";
// import { useAtom } from "jotai";

export default function LicenceTable() {
    // const [ search ] = useAtom(searchAtom)
    const [page, setPage] = useState<number>(1);
    const [limit, setLimt] = useState<string>("10");
    const [ isOpen, setIsOpen ] = useState(false)
    const [dataInfo, setDataInfo] = useState<IBusinessDetails[]>([]);
    const [seleted, setSeleted] = useState<IBusinessDetails>();

    const { data, isLoading } = useFetchData<IPagination<IBusinessDetails[]>>({
        endpoint: URLS.BUSINESS,
        name: ["business"],
        pagination: true,
        params: {
            limit: Number(limit),
            page: page,
        },
    });

    console.log(dataInfo);

    useEffect(() => {
        if (Array.isArray(data?.data) && data?.data.length > 0) {
            setDataInfo(data.data as unknown as IBusinessDetails[]);
        } else {
            setDataInfo([]);
        }
    }, [data?.data, isLoading]);

    const handleClick = (item: IBusinessDetails) =>{
        setSeleted(item)
        setIsOpen(true)
    }

    const adminColumn: Column<IBusinessDetails>[] = [
        {
            key: "name",
            label: "Business",
        },
        {
            key: null,
            label: "Created by",
            type: "custom",
            render: (item) => {
                return <div className="">{item?.creator?.email}</div>;
            },
        },
        {
            key: null,
            label: "License",
            type: "custom",
            render: (item) => {
                return (
                    <>
                        {item?.licenseNumber && (
                            <div className=" w-fit rounded-full py-1 px-3 border-[#DDE6EB] border ">
                                {item?.licenseNumber}
                            </div>
                        )}
                    </>
                );
            },
        },
        {
            key: null,
            label: "Status",
            type: "custom",
            render: (item) => {
                return (
                    <div
                        className={` w-fit text-xs font-medium flex items-center justify-center gap-1 rounded-4xl h-[30px] px-3 border-[#DDE6EB] ${item?.licenseStatus === "NOT_LICENSED" ? " bg-red-100 text-red-700 " : item?.licenseStatus === "PENDING" ? " bg-amber-100 text-yellow-700 " : "bg-[#E7FDE7] text-[#007F00]"} border `}
                    >
                        {item?.licenseStatus === "PENDING"
                            ? "Pending":
                            item?.licenseStatus === "NOT_LICENSED" 
                            ? "Not Licensed"
                            : "Verified"}
                        
                        {(item?.licenseStatus !== "PENDING" && item?.licenseStatus !== "NOT_LICENSED" )&& (
                            <PiSealCheckFill size={"13px"} />
                        )}
                    </div>
                );
            },
        },
        {
            key: "createdAt",
            label: "Date Created",
            type: "custom",
            render: (item) => {
                return (
                    <div className=" w-fit rounded-full py-1 px-3 border-[#DDE6EB] border ">
                        {dateFormat(item?.createdAt)}
                    </div>
                );
            },
        },
        {
            key: null,
            label: "Action",
            type: "custom",
            render: (item) => {
                return (
                    <button onClick={()=> handleClick(item)} className=" text-[#5D70F9] text-sm font-semibold " >
                        View
                    </button>
                );
            },
        },
    ];

    return (
        <div className="w-full flex flex-col">
            <CustomTable
                columns={adminColumn}
                rows={dataInfo?.map((row) => ({
                    key: row?._id,
                    ...row,
                }))}
                isLoading={isLoading}
                page={page}
                setPage={setPage}
                limit={limit}
                setLimit={setLimt}
                total={data?.total ?? 0}
            />
            <LicenceInfo isOpen={isOpen} item={seleted as IBusinessDetails} setIsOpen={setIsOpen} />
        </div>
    );
}
