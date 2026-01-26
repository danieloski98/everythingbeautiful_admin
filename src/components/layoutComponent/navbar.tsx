"use client"
import { useUserStore } from "@/hooks/user"; 
import { usePathname } from "next/navigation";
import { RiNotification2Fill, RiSearch2Line } from "react-icons/ri";
import { CustomInput } from "../custom";
import { useAtom } from "jotai";
import { searchAtom } from "@/store/search";

export default function Navbar() {

    const pathname = usePathname()
    const { data } = useUserStore();

    const [ search, setSearch ] = useAtom(searchAtom)

    return (
        <div className=" w-full flex top-0 sticky z-50 items-center justify-between h-[80px] shadow bg-white px-6 " >
            <div className="  " >
                {pathname === "/dashboard" && (
                    <div className=" flex flex-col " >
                        <p className=" text-2xl font-bold " >Dashboard</p>
                        <p className=" font-medium " >Welcome back, <span className=" text-brand " >{data?.fullname}!</span></p>
                    </div>
                )}
                {pathname !== "/dashboard" && (
                    <div className=" flex w-[300px] " >
                        <CustomInput startContent={
                            <RiSearch2Line />
                        } icon notform name="search" type="search" localValue={search} setLocalValue={setSearch} placeholder={`Search for ${pathname?.includes("user") ? "user" : pathname?.includes("shop") ? "product" : "service"}`} />
                    </div>
                )}
            </div>
            <div className=" flex items-center gap-4 " >
                <RiNotification2Fill size={"25px"} />
                <div className=" flex gap-2 items-center " >
                    <div className=" w-fit " >
                        <div className=" w-[30px] h-[30px] bg-gray-400 rounded-full " />
                    </div>
                    <div className=" flex flex-col items-start " >
                        <div className=" flex items-center gap-1 " >
                            <p className=" text-sm font-semibold capitalize " >{data?.fullname}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}