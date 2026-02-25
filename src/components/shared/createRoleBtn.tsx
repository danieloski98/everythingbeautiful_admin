"use client";
import { useAuth } from "@/hooks";
import {
    CustomButton,
    CustomInput,
    CustomMultipleSelect,
    ModalLayout,
} from "../custom";
import { FormikProvider } from "formik"; 
import { permission } from "@/helper/utils/databank";

export default function CreateRoleBtn() {
    const { formikRole, isLoading, isOpen, setIsOpen } = useAuth();
 
    return (
        <div className=" ">
            <CustomButton onClick={() => setIsOpen(true)}>
                Add Roles
            </CustomButton>
            <ModalLayout
                size="sm"
                title="Add Admin Account"
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <FormikProvider value={formikRole}>
                    <form
                        onSubmit={formikRole.handleSubmit}
                        className=" w-full flex-col flex gap-4 "
                    >
                        <CustomInput
                            name="name"
                            placeholder="Enter Name"
                            type="text"
                        />
                        <CustomMultipleSelect
                            name="permissions"
                            placeholder="Add permissions"
                            options={Array.isArray(permission) ? permission : []}
                        />
                        <CustomButton type="submit" isLoading={isLoading}>
                            Create Role
                        </CustomButton>
                    </form>
                </FormikProvider>
            </ModalLayout>
        </div>
    );
}
