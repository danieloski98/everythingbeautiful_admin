"use client"
import { adminAnalytics, homeAnalytics, productAnalytics, serviceAnalytics, userAnalytics } from "@/helper/utils/databank";
import { Analytics } from "../shared";
import { useAtom } from "jotai";
import { searchAtom } from "@/store/search"; 
import { usePathname } from "next/navigation";


export default function AnalyticsLayout(
    {
        children,
    }: {
        children: React.ReactNode;
    }
) {

    const [search] = useAtom(searchAtom)
    const pathname = usePathname()

    return (
        <div className="w-full h-full flex flex-col gap-4">
            {(!search && (!pathname?.includes("roles") && !pathname?.includes("licence"))) && (
                <Analytics
                    labels={
                        pathname?.includes("user")
                            ? userAnalytics
                            : pathname?.includes("shop")
                                ? productAnalytics
                                : pathname?.includes("service")
                                    ? serviceAnalytics
                                    : pathname?.includes("admin") 
                                    ? adminAnalytics 
                                    : pathname === "/dashboard" ?
                                    homeAnalytics
                                    : []
                    }
                />
            )}
            {children}
        </div>
    )
}