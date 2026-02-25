"use client";
import { Avatar } from "@heroui/react";
import { CustomButton } from "../custom"; 
import { dateFormat } from "@/helper/utils/dateFormat";
import { IBusinessDetails } from "@/helper/model/business";
import { ConfirmationModal } from "../modals";
import { useState } from "react";

export default function BusinessInfo(props: {business: IBusinessDetails, onClose: (by: boolean)=> void}) {

    const [ isOpen, setIsOpen ] = useState(false)

    return (
        <>
            {props?.business?._id && (
                <div className=" w-full flex flex-col gap-4 mt-4 ">
                    <p className=" font-medium ">Business</p>
                    <div className=" w-full flex gap-2 items-center ">
                        <div className=" w-fit ">
                            <Avatar
                                style={{ width: "60px", height: "60px" }}
                                radius="md"
                                src={props?.business?.pictures[0]}
                                name={props?.business?.name}
                            />
                        </div>
                        <div className=" flex flex-col ">
                            <p className=" text-sm capitalize ">
                                {props?.business?.name}
                            </p>
                            <p className=" text-sm ">
                                <span className=" font-bold ">
                                    Created At:{" "}
                                </span>
                                {dateFormat(props?.business?.createdAt as string)}
                            </p>
                        </div>
                    </div>
                    <div className=" max-w-[180px] ">
                        <CustomButton
                            onClick={() =>
                                setIsOpen(true)
                            }
                            rounded="full"
                            fullWidth 
                            variant="customDanger"
                        >
                            Delete Buisness
                        </CustomButton>
                    </div>
                    <ConfirmationModal type={"business"} isOpen={isOpen} onClose={props.onClose} setIsOpen={setIsOpen} id={props?.business?._id} />
                </div>
            )}
        </>
    );
}
