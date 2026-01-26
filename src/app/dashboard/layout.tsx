import { AnalyticLayout, Sidebar } from "@/components/layoutComponent";
import Navbar from "@/components/layoutComponent/navbar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    
    return (
        <div className=" w-full h-screen flex overflow-hidden bg-white  " >
            <div className=" w-fit " >
                <Sidebar />
            </div>
            <div className=" w-full h-screen relative overflow-y-auto overflow-x-hidden " >
                <Navbar />
                <div className=" w-full flex p-4 " >
                    <AnalyticLayout>
                        {children}
                    </AnalyticLayout>
                </div>
            </div>
        </div>
    );
}
