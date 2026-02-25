"use client" 
import { CustomButton } from "../custom"; 
import { ConfirmationModal } from "../modals";
import { IType } from "@/helper/model/auth";
import { useState } from "react";

interface IProps {
    onClose: (by: boolean) => void;
    type: IType;
    id: string
}

export default function DeleteBtn(
    {
        onClose,
        type,
        id
    }: IProps
) {

    const [isOpen, setIsOpen] = useState(false) 

    return (
        <div className=" gap-4 flex items-center " >
            <CustomButton variant="outline" onClick={() => onClose(false)}>
                Close
            </CustomButton>
            <CustomButton variant="customDanger" onClick={()=> setIsOpen(true)}>
                Delete <span className=" capitalize " >{type}</span>
            </CustomButton>
            <ConfirmationModal type={type} isOpen={isOpen} onClose={onClose} setIsOpen={setIsOpen} id={id} />
        </div>
    )
}