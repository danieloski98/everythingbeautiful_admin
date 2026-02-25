import { IAdmin } from "@/helper/model/admin";
import { dateFormat } from "@/helper/utils/dateFormat";
import { Avatar } from "@heroui/react"; 
import { RiEdit2Fill } from "react-icons/ri";

export default function AdminInfo(props: IAdmin) { 

    return (
        <div className=" w-full flex flex-col gap-8 items-center pt-6 ">
            <div className=" w-full flex justify-end ">
                <button>
                    <RiEdit2Fill size={"20px"} />
                </button>
            </div>
            <Avatar
                style={{ width: "120px", height: "120px" }}
                src={"/admin.webp"}
                name={props?.fullname}
            />
            <div className=" w-full flex flex-col gap-3 overflow-y-auto ">
                <div className=" flex flex-col gap-1 ">
                    <p className=" font-medium ">Name</p>
                    <p className=" text-sm capitalize ">{props?.fullname}</p>
                </div>
                <div className=" flex flex-col gap-1 ">
                    <p className=" font-medium ">Email</p>
                    <div className=" flex items-center gap-1 ">
                        <p className=" text-sm ">{props?.email}</p>
                    </div>
                </div>
                <div className=" flex flex-col gap-1 ">
                    <p className=" font-medium ">Role</p>
                    <div className=" flex items-center gap-1 ">
                        <p className=" text-sm ">{props?.role}</p>
                    </div>
                </div>
                <div className=" flex flex-col gap-1 ">
                    <p className=" font-medium ">Access</p>
                    <div className=" flex items-center gap-1 ">
                        {props?.access?.map((item, index) => {
                            return (
                                <p key={index} className=" text-sm ">
                                    {item}
                                </p>
                            );
                        })}
                    </div>
                </div>
                <div className=" flex flex-col gap-1 ">
                    <p className=" font-medium ">Date Created</p>
                    <div className=" flex items-center gap-1 ">
                        {dateFormat(props?.createdAt)}
                    </div>
                </div>
            </div>
        </div>
    );
}
