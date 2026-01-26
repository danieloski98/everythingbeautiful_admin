import { CustomImage } from "../custom";

export default function AuthLayout(
    {
        children
    } : { 
        children: React.ReactNode;
    }
) {
    return(
        <div className=" w-full flex h-screen bg-white ">
          <div className=" w-full h-full bg-[#FBFBFB] flex flex-col items-center justify-center " >
            <div className=" max-w-[435px] w-full rounded-2xl flex flex-col gap-4 items-center p-6 bg-white " >
                {children}
            </div>
          </div>
          <div className=" w-full h-full bg-amber-300 " >
            <CustomImage src={"/images/auth.jpg"} fillContainer alt="auth" />
          </div>
        </div>
    )
}