"use client"
import { menu } from "@/helper/utils/databank";
import { CustomImage } from "../custom";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const isActive = (link: string) => (pathname === link)
    
    return (
        <div className=" w-[320px] flex flex-col bg-brand h-screen px-6 pt-10 " >
            <CustomImage src={"/images/logowhite.png"} alt="logo" width={92} height={33} />
            <div className=" w-full flex flex-col gap-3 mt-20" >
                {menu.map((item, index) => {
                    return (
                        <button onClick={() => router.push(item.link)} key={index} className={` ${isActive(item.link) ? " bg-white text-brand " : " text-white "} w-full flex items-center px-3 gap-2 h-[45px] rounded-md `} >
                            <item.icon size={"25px"} />
                            <p className=" text-sm font-medium " >{item?.name}</p>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}