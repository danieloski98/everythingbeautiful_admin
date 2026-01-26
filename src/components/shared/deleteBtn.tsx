"use client"
import useDeleteHook from "@/hooks/useDeleteHook";
import { CustomButton } from "../custom";
import { useEffect } from "react";

interface IProps {
    onClose: (by: boolean) => void;
    type: "user" | "service" | "product";
    id: string
}

export default function DeleteBtn(
    {
        onClose,
        type,
        id
    }: IProps
) {

    const { deletaProductMutation, deletaServiceMutation, isLoading } = useDeleteHook()

    const handleDelete = () => {
        if (type === "product") {
            deletaProductMutation.mutate(id, {
                onSuccess: () => onClose(false),
            })
        } else if (type === "service") {
            deletaServiceMutation.mutate(id, {
                onSuccess: () => onClose(false),
            })
        }
    }

    return (
        <div className=" gap-4 flex items-center " >
            <CustomButton variant="outline" onClick={() => onClose(false)}>
                Close
            </CustomButton>
            <CustomButton isLoading={isLoading} variant="customDanger" onClick={handleDelete}>
                Delete <span className=" capitalize " >{type}</span>
            </CustomButton>
        </div>
    )
}