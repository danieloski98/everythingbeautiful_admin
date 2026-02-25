"use client";
import { CustomButton, CustomImage, ModalLayout } from "@/components/custom";
import { BusinessInfo } from "@/components/shared";
import { IBusinessDetails } from "@/helper/model/business";
import { dateFormat } from "@/helper/utils/dateFormat";
import { Avatar } from "@heroui/react";
import { ConfirmationModal } from "..";
import { useState } from "react";
import { IType } from "@/helper/model/auth";

export default function LicenceInfo({
    isOpen,
    setIsOpen,
    item,
}: {
    isOpen: boolean;
    setIsOpen: (by: boolean) => void;
    item: IBusinessDetails;
}) {
    const [show, setShow] = useState(false);
    const [type, setType] = useState<IType>("");

    const handleClick = (item: IType) => {
        setType(item);
        setShow(true);
    };

    return (
        <ModalLayout
            size="3xl"
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
        >
            <div className=" w-full flex-col flex gap-6 ">
                <div className=" w-full flex justify-around items-center py-6 border-b ">
                    <div className=" w-fit h-fit rounded-full border-brand border ">
                        <Avatar
                            style={{ width: "120px", height: "120px" }}
                            src={item?.creator?.profilePicture}
                            name={item?.creator?.firstName}
                        />
                    </div>
                    <div className=" flex flex-col gap-2 ">
                        <p className=" text-2xl font-bold capitalize ">
                            {item?.creator?.firstName +
                                " " +
                                item?.creator?.lastName}
                        </p>
                        <p className=" text-sm font-semibold text-brand ">
                            Self care services
                        </p>
                    </div>
                    <div className=" flex flex-col gap-2 ">
                        <p>State of license </p>
                        <p className=" text-sm font-semibold text-brand ">
                            Self care services
                        </p>
                    </div>
                    <div className=" flex flex-col gap-2 ">
                        <p>Review</p>
                        <p className=" text-sm font-semibold text-brand ">
                            {item?.rating} rating
                        </p>
                    </div>
                </div>
                <div className=" w-full flex flex-col gap-4 ">
                    <p>Licence information</p>
                    <div className=" flex justify-between items-center ">
                        <div className=" px-4 flex flex-col ">
                            <p className=" font-bold text-brand ">
                                Licence Number
                            </p>
                            <div className=" text-sm flex gap-3 font-medium items-center ">
                                {item?.licenseNumber
                                    ? item?.licenseNumber
                                    : "----"}
                            </div>
                        </div>

                        <div className=" px-4 flex flex-col ">
                            <p className=" font-bold text-brand ">
                                Date of Registration
                            </p>
                            <div className=" text-sm flex gap-3 font-medium items-center ">
                                {dateFormat(item?.createdAt)}
                            </div>
                        </div>
                    </div>
                </div>
                <BusinessInfo onClose={setIsOpen} business={item} />
                <div className=" w-full flex flex-col gap-2 rounded-2xl bg-[#EAEBED99] p-6 ">
                    <p className=" font-bold ">Trust & Safety</p>
                    <p className=" text-sm ">
                        This provider has passed our comprehensive Background
                        check and maintains active professional insurance
                        converge.
                    </p>
                </div>
                {item?.licenseStatus === "PENDING" && (
                    <div className=" flex gap-4 items-center mt-3 ">
                        <div className=" w-[180px] ">
                            <CustomButton fullWidth onClick={()=> handleClick("license")} rounded="full">
                                Approve Verification
                            </CustomButton>
                        </div>
                        <div className=" w-[180px] ">
                            <CustomButton
                                fullWidth
                                rounded="full"
                                variant="customDanger"
                                onClick={()=> handleClick("notlicense")} 
                            >
                                Decline{" "}
                            </CustomButton>
                        </div>
                    </div>
                )}
            </div>
            <ConfirmationModal
                isOpen={show}
                setIsOpen={setShow}
                onClose={setIsOpen}
                type={type}
                id={item?._id}
            />
        </ModalLayout>
    );
}
