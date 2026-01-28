"use client";
import { useAuth } from "@/hooks";
import { CustomButton, CustomInput, ModalLayout } from "../custom"; 
import { FormikProvider } from "formik";

export default function CreateAdminBtn() {
  const { formikAdmin, isLoading, isOpen, setIsOpen } = useAuth(); 

  return (
    <div className=" ">
      <CustomButton onClick={() => setIsOpen(true)}>Add Admin</CustomButton>
      <ModalLayout
        size="sm"
        title="Add Admin Account"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <FormikProvider value={formikAdmin}>
          <form
            onSubmit={formikAdmin.handleSubmit}
            className=" w-full flex-col flex gap-4 "
          >
            <CustomInput
              name="fullName"
              placeholder="Enter Full Name"
              type="text"
            />
            <CustomInput
              name="email"
              type="email"
              placeholder="example@mail.com"
            />
            <CustomButton type="submit" isLoading={isLoading}>
              Create Admin
            </CustomButton>
          </form>
        </FormikProvider>
      </ModalLayout>
    </div>
  );
}
