"use client"
import { homeAnalytics, productAnalytics, serviceAnalytics, userAnalytics } from "@/helper/utils/databank";
import { Analytics } from "../shared";
import { useAtom } from "jotai";
import { searchAtom } from "@/store/search";
import { IAnalyticLabel } from "@/helper/model/analytice";
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
            {!search && (
                <Analytics
                    labels={
                        pathname?.includes("user")
                            ? userAnalytics
                            : pathname?.includes("shop")
                                ? productAnalytics
                                : pathname?.includes("service")
                                    ? serviceAnalytics
                                    : homeAnalytics
                    }
                />
            )}
            {children}
        </div>
    )
}