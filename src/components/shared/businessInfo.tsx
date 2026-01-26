"use client"
import { Avatar } from "@heroui/react";
import { CustomButton } from "../custom";
import useDeleteHook from "@/hooks/useDeleteHook";
import { dateFormat } from "@/helper/utils/dateFormat";
import { IBusinessDetails } from "@/helper/model/business";


export default function BusinessInfo(
    props : IBusinessDetails
) {

    const { deletaBuisnessMutation, isLoading } = useDeleteHook()

    return (
        <>
            {props?._id && (
                <div className=" w-full flex flex-col gap-4 mt-4 " >
                    <p className=" font-medium " >Business</p>
                    <div className=" w-full flex gap-2 items-center " >
                        <div className=" w-fit " >
                            <Avatar style={{ width: "60px", height: "60px" }} radius="md" src={props?.pictures[0]} name={props?.name} />
                        </div>
                        <div className=" flex flex-col " >
                            <p className=" text-sm capitalize " >{props?.name}</p>
                            <p className=" text-sm " ><span className=" font-bold " >Created At: </span>{dateFormat(props?.createdAt as string)}</p>
                        </div>
                    </div>
                    <CustomButton onClick={() => deletaBuisnessMutation.mutate(props?._id)} isLoading={isLoading} variant="customDanger"  >
                        Delete Buisness
                    </CustomButton>
                </div>
            )}
        </>
    )
}