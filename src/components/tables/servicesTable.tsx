"use client"
import { CustomTable } from "../custom";
import { useFetchData } from "@/hooks/useFetchData";
import { IServiceDetail } from "@/helper/model/business";
import { URLS } from "@/helper/services/urls";
import { textLimit } from "@/helper/utils/textlimit";
import { useEffect, useState } from "react";
import { IPagination } from "@/helper/model/pagination";
import { Column } from "@/helper/model/table";
import { DeleteBtn, DrawerLayout } from "../shared";
import { ServiceInfo } from "../modals";
import { searchAtom } from "@/store/search";
import { useAtom } from "jotai";
// import { useAtom } from "jotai";
// import { searchAtom } from "@/store/search";

export default function ServicesTable() {

    // const [ search ] = useAtom(searchAtom)
    const [page, setPage] = useState<number>(1)
    const [limit, setLimt] = useState<string>("10")
    const [dataInfo, setDataInfo] = useState<IServiceDetail[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false) 
    const [selectedData, setSelectedData] = useState<IServiceDetail | null>(null)
    const [search] = useAtom(searchAtom);

    const { data, isLoading } = useFetchData<IPagination<Array<IServiceDetail>>>({
        endpoint: URLS.SERVICE,
        name: ["service"],
        pagination: true,
        params: {
            limit: Number(limit),
            page: page
        }
    })

    const handleOpen = (item: IServiceDetail) => {
        setSelectedData(item)
        setIsOpen(true)
    }

    useEffect(() => {
        if (Array.isArray(data?.data) && data?.data.length > 0) {
            setDataInfo(data.data as unknown as IServiceDetail[]);
        } else {
            setDataInfo([]);
        }
    }, [data?.data, isLoading]);


    const serviceColumn: Column<IServiceDetail>[] = [
        {
            key: "name",
            label: "Services",
            type: "custom",
            render: (item) => {
                return (
                    <p className=" font-semibold capitalize " >{textLimit(item?.name, 20)}</p>
                )
            }
        },
        {
            key: null,
            label: "Created by",
            type: "custom",
            render: (item) => {
                return (
                    <div className=" w-fit rounded-full py-1 px-3 " >
                        {item?.business?.creator?.email}
                    </div>
                )
            }
        },
        {
            key: "createdAt",
            label: "Date",
            type: "date",
        },
        {
            key: "hourlyRate",
            label: "Services Price",
            type: "currency",
        },
        {
            key: null,
            type: "custom",
            label: "Action",
            render: (item) => {
                return (
                    <button onClick={()=> handleOpen(item)} className=" text-sm font-semibold text-blue-500 " >View</button>
                )
            }
        }
    ]

    return (
        <div className="w-full flex flex-col">
            <CustomTable
                columns={serviceColumn}
                rows={
                    dataInfo.map((row) => ({
                        key: row._id,
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

            <DrawerLayout isOpen={isOpen} setIsOpen={setIsOpen} title="Service Information" footerchildren={
                <DeleteBtn onClose={setIsOpen} type="service" id={selectedData?._id as string} />
            } >
                <ServiceInfo setIsOpen={setIsOpen} service={selectedData as IServiceDetail} />
            </DrawerLayout>
        </div>
    )
} 
