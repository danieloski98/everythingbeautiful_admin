import useDeleteHook from "@/hooks/useDeleteHook";
import { CustomButton, ModalLayout } from "../custom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Warning2 } from "iconsax-reactjs";
import { IType } from "@/helper/model/auth";
import { useEffect } from "react";

export default function Confirmation({
    isOpen,
    setIsOpen,
    onClose,
    type,
    id,
}: {
    isOpen: boolean;
    setIsOpen: (by: boolean) => void;
    onClose: (by: boolean) => void;
    type: IType;
    id: string;
}) {
    const {
        deleteProductMutation,
        deletaServiceMutation,
        deleteAdminMutation,
        deletaBuisnessMutation,
        licenseMutation,
        isLoading,
        isSuccess
    } = useDeleteHook();

    const handlerClose = () => {
        setIsOpen(false);
        onClose(false);
    };

    useEffect(()=> {
        if(isSuccess) {
            handlerClose()
        }
    }, [isSuccess])
    

    const handleDelete = () => {
        if (type === "product") {
            deleteProductMutation.mutate(id, {
                onSuccess: () => handlerClose,
            });
        } else if (type === "service") {
            deletaServiceMutation.mutate(id, {
                onSuccess: () => handlerClose,
            });
        } else if (type === "admin") {
            deleteAdminMutation.mutate(id, {
                onSuccess: () => handlerClose,
            });
        } else if (type === "business") {
            deletaBuisnessMutation.mutate(id, {
                onSuccess: () => handlerClose,
            });
        } else if (type === "license") {
            licenseMutation.mutate(
                {
                    status: "LICENSED",
                    id: id,
                },
                {
                    onSuccess: () => handlerClose,
                },
            );
        } else if (type === "notlicense") {
            licenseMutation.mutate(
                {
                    status: "NOT_LICENSED",
                    id: id,
                },
                {
                    onSuccess: () => handlerClose,
                },
            );
        }
    };

    const label =
        type === "product"
            ? "product"
            : type === "service"
              ? "service"
              : type === "business"
                ? "business"
                : type === "license"
                  ? "license"
                  : type === "notlicense"
                    ? "license"
                    : type === "admin"
                      ? "admin"
                      : "";

    return (
        <ModalLayout
            size="sm"
            isOpen={isOpen}
            onClose={() => setIsOpen(isLoading ? true : false)}
        >
            <div className="flex flex-col gap-4 w-full ">
                <div className="w-full flex flex-col gap-2 items-center">
                    {/* <div className="w-20 h-20 rounded-full border-8 bg-red-300 border-red-100 flex justify-center items-center">
                        <Warning2 size={30} className="text-red-600" />
                    </div> */}

                    {!type.includes("license") ? (
                        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
                            <RiDeleteBin6Line
                                size={30}
                                className="text-red-600"
                            />
                        </div>
                    ) : (
                        <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center">
                            <Warning2 size={30} className="text-yellow-600" />
                        </div>
                    )}
                    <p className="text-xl mt-3 text-center  font-bold">
                        {!type.includes("license") && "Delete"} {label}
                    </p>

                    <div className=" flex flex-col items-center ">
                        <p className="text-xs font-medium text-center text-secondary">
                            This action cannot be undone. This will permanently
                            remove this {label} from the system.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-full">
                    {!type.includes("license") && (
                        <CustomButton
                            onClick={handleDelete}
                            variant="customDanger"
                            fullWidth
                            isLoading={isLoading}
                        >
                            Delete {label}
                        </CustomButton>
                    )}
                    {type.includes("license") && (
                        <CustomButton
                            onClick={handleDelete}
                            variant={
                                type.includes("not")
                                    ? "customDanger"
                                    : "primary"
                            }
                            fullWidth
                            isLoading={isLoading}
                        >
                            {type.includes("not") ? "Decline" : "Approve"}
                        </CustomButton>
                    )}
                    <CustomButton
                        variant="outline"
                        fullWidth
                        onClick={() => setIsOpen(false)}
                    >
                        Cancel
                    </CustomButton>
                </div>
            </div>
        </ModalLayout>
    );
}
