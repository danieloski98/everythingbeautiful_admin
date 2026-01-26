"use client"
import { CustomTable } from "../custom";
import { useFetchData } from "@/hooks/useFetchData";
import { IProductDetail } from "@/helper/model/business";
import { URLS } from "@/helper/services/urls";
import { textLimit } from "@/helper/utils/textlimit";
import { Column } from "@/helper/model/table";
import { useEffect, useState } from "react";
import { IPagination } from "@/helper/model/pagination";
import { DeleteBtn, DrawerLayout } from "../shared";
import { ProductInfo } from "../modals";

export default function ProductsTable() {

    const [page, setPage] = useState<number>(1)
    const [limit, setLimt] = useState<string>("10")
    const [dataInfo, setDataInfo] = useState<IProductDetail[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedData, setSelectedData] = useState<IProductDetail | null>(null)

    const { data, isLoading } = useFetchData<IPagination<Array<IProductDetail>>>({
        endpoint: URLS.PRODUCT,
        name: ["product"],
        pagination: true,
        params: {
            limit: Number(limit),
            page: page
        }
    })

    const handleOpen = (item: IProductDetail) => {
        setSelectedData(item)
        setIsOpen(true)
    }

    useEffect(() => {
        if (Array.isArray(data?.data) && data?.data.length > 0) {
            setDataInfo(data.data as unknown as IProductDetail[]);
        } else {
            setDataInfo([]);
        }
    }, [data?.data, isLoading]);

    const productColumn: Column<IProductDetail>[] = [
        {
            key: "name",
            label: "Product",
            type: "custom",
            render: (item) => {
                return (
                    <p className=" font-semibold capitalize " >{textLimit(item?.name, 20)}</p>
                )
            }
        },
        {
            key: "business",
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
            key: "price",
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
                columns={productColumn}
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
            <DrawerLayout isOpen={isOpen} setIsOpen={setIsOpen} title="Product Information" footerchildren={
                <DeleteBtn onClose={setIsOpen} type="product" id={selectedData?._id as string} />
            } >
                <ProductInfo {...selectedData as IProductDetail} />
            </DrawerLayout>
        </div>
    )
} 
