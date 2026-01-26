"use client"
import { CustomButton, CustomInput } from "@/components/custom";
import { AuthLayout } from "@/components/layoutComponent";
import { useAuth } from "@/hooks";
import { FormikProvider } from "formik";


export default function Home() {

  const { formik, isLoading } = useAuth()

  return (
    <FormikProvider value={formik} >
      <AuthLayout>
        <form onSubmit={formik.handleSubmit} className=" w-full flex flex-col gap-4 " > 
        <div className=" w-fit flex-col flex gap-0.5 " >
              <p className=" text-2xl font-medium " >Welcome to Everything Beauty</p>
              <p className=" text-secondary text-sm w-[300px] text-center ">Admin Panel</p>
            </div>
            <CustomInput label="Email/Username" name="email" placeholder="Email Address" />
            <CustomButton type="submit" isLoading={isLoading} fullWidth height="56px" >Continue</CustomButton>
        </form>
      </AuthLayout> 
    </FormikProvider>
  );
}
