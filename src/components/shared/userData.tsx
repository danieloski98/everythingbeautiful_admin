import { IUserDetail } from "@/helper/model/user";
import { dateFormat } from "@/helper/utils/dateFormat";
import { RiVerifiedBadgeFill } from "react-icons/ri";

export default function UserData(
    props: IUserDetail
) {
    return (
        <div className=" w-full flex flex-col gap-3 " >
            <div className=" flex flex-col gap-1 " >
                <p className=" font-medium " >Name</p>
                <p className=" text-sm capitalize " >{props?.firstName + " " + props?.lastName}</p>
            </div>
            <div className=" flex flex-col gap-1 " >
                <p className=" font-medium " >Email</p>
                <div className=" flex items-center gap-1 " >
                    <p className=" text-sm " >{props?.email}</p>
                    {props?.emailVerified && (
                        <RiVerifiedBadgeFill className=" text-green-500 " />
                    )}
                </div>
            </div>
            <div className=" flex flex-col gap-1 " >
                <p className=" font-medium " >Gender</p>
                <div className=" flex items-center gap-1 " >
                    <p className=" text-sm " >{props?.gender}</p>
                </div>
            </div>
            <div className=" flex flex-col gap-1 " >
                <p className=" font-medium " >Phone Number</p>
                <div className=" flex items-center gap-1 " >
                    <p className=" text-sm " >{props?.phoneNumber}</p>
                </div>
            </div>
            <div className=" flex flex-col gap-1 " >
                <p className=" font-medium " >Joined Date</p>
                <div className=" flex items-center gap-1 " >
                    <p className=" text-sm " >{dateFormat(props?.createdAt as string)}</p>
                </div>
            </div>
        </div>
    )
}