"use client"

import { useFormik } from "formik"
import { addToast } from "@heroui/toast"
import httpService, { unsecureHttpService } from "@/helper/services/httpService"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { IAdminAuth, ILogin, IRoleAuth } from "@/helper/model/auth"
import { adminSchema, emailSchema, roleSchema } from "@/helper/services/validation"
import { handleError } from "@/helper/services/errorHandler"
import { URLS } from "@/helper/services/urls"
import { useState } from "react"

const useAuth = () => {

    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient()

    const router = useRouter()

    /** 🔹 Login */
    const loginMutation = useMutation({
        mutationFn: (data: ILogin) =>
            unsecureHttpService.post(URLS.LOGIN, data),
        onError: handleError,
        onSuccess: (res) => {
            addToast({
                title: "Success",
                description: res?.data?.message,
                color: "success",
            })
            router.push(`/auth/verification?email=${formik.values.email}`)
        },
    })

    /** 🔹 Admin */
    const adminMutation = useMutation({
        mutationFn: (data: IAdminAuth) =>
            httpService.post(URLS.ADMIN, data),
        onError: handleError,
        onSuccess: (res) => {
            addToast({
                title: "Success",
                description: res?.data?.message,
                color: "success",
            }) 

            queryClient.invalidateQueries({ queryKey: ["admin"] })
            setIsOpen(false)

        },
    })

    /** 🔹 Admin */
    const roleMutation = useMutation({
        mutationFn: (data: IRoleAuth) =>
            httpService.post(URLS.ROLE, data),
        onError: handleError,
        onSuccess: (res) => {
            addToast({
                title: "Success",
                description: res?.data?.message,
                color: "success",
            }) 

            queryClient.invalidateQueries({ queryKey: ["role"] })
            setIsOpen(false)

        },
    })

    /** 🔹 Verify OTP */
    const verifyMutation = useMutation({
        mutationFn: (data: { code: string }) =>
            unsecureHttpService.post(URLS.VERIFY, data),
        onError: handleError,
        onSuccess: (res) => {
            const { token, admin } = res.data.data

            localStorage.setItem("accesstoken", token)
            localStorage.setItem("userid", admin?._id)
            addToast({
                title: "Success",
                description: res?.data?.message,
                color: "success",
            })

            router.push("/dashboard")
        },
    })

    /** 🔹 Formik Instances */
    const formik = useFormik<ILogin>({
        initialValues: { email: "" },
        validationSchema: emailSchema,
        onSubmit: (data) => loginMutation.mutate(data),
    })

    /** 🔹 Formik Instances */
    const formikAdmin = useFormik<IAdminAuth>({
        initialValues: {
            "fullName": "",
            "email": ""
          },
        validationSchema: adminSchema,
        onSubmit: (data) => adminMutation.mutate(data),
    })


    /** 🔹 Formik Instances */
    const formikRole = useFormik<IRoleAuth>({
        initialValues: {
            "name": "",
            "permissions": []
          },
        validationSchema: roleSchema,
        onSubmit: (data) => roleMutation.mutate(data),
    })

    /** 🔹 Loading State */
    const isLoading =
        loginMutation.isPending ||
        verifyMutation.isPending ||
        adminMutation.isPending ||
        roleMutation.isPending 

    /** 🔹 Loading State */
    const isSuccess =
        loginMutation.isSuccess ||
        verifyMutation.isSuccess ||
        adminMutation.isSuccess ||
        roleMutation.isSuccess 

    return {
        formik,
        formikAdmin,
        formikRole,
        isLoading,
        isSuccess,
        verifyMutation,
        isOpen,
        setIsOpen
    }
}

export default useAuth
