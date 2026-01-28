"use client"
 
import { addToast } from "@heroui/toast"
import httpService from "@/helper/services/httpService"
import { useMutation, useQueryClient } from "@tanstack/react-query" 
import { handleError } from "@/helper/services/errorHandler"
import { URLS } from "@/helper/services/urls"
import { useState } from "react"

const useDeleteHook = () => {

    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient() 

    /** 🔹 Buisness */
    const deletaBuisnessMutation = useMutation({
        mutationFn: (data: string) =>
            httpService.delete(URLS.BUSINESSBYID(data)),
        onError: handleError,
        onSuccess: (res) => {
            addToast({
                title: "Success",
                description: res?.data?.message,
                color: "success",
            }) 
            queryClient.invalidateQueries({ queryKey: ["user"] })
            queryClient.invalidateQueries({ queryKey: ["analytics"] })
        },
    }) 

    /** 🔹 Service */
    const deletaServiceMutation = useMutation({
        mutationFn: (data: string) =>
            httpService.delete(URLS.SERVICEBYID(data)),
        onError: handleError,
        onSuccess: (res) => {
            addToast({
                title: "Success",
                description: res?.data?.message,
                color: "success",
            }) 
            queryClient.invalidateQueries({ queryKey: ["service"] })
            queryClient.invalidateQueries({ queryKey: ["analytics"] })
        },
    }) 

    /** 🔹 Product */
    const deleteProductMutation = useMutation({
        mutationFn: (data: string) =>
            httpService.delete(URLS.PRODUCTBYID(data)),
        onError: handleError,
        onSuccess: (res) => {
            addToast({
                title: "Success",
                description: res?.data?.message,
                color: "success",
            }) 
            queryClient.invalidateQueries({ queryKey: ["product"] })
            queryClient.invalidateQueries({ queryKey: ["analytics"] })
        },
    }) 

    /** 🔹 Product */
    const deleteAdminMutation = useMutation({
        mutationFn: (data: string) =>
            httpService.delete(URLS.ADMINBYID(data)),
        onError: handleError,
        onSuccess: (res) => {
            addToast({
                title: "Success",
                description: res?.data?.message,
                color: "success",
            }) 
            queryClient.invalidateQueries({ queryKey: ["admin"] })
            queryClient.invalidateQueries({ queryKey: ["analytics"] })
        },
    })

    /** 🔹 Loading State */
    const isLoading =
        deletaBuisnessMutation.isPending || 
        deleteProductMutation.isPending || 
        deletaServiceMutation.isPending ||
        deleteAdminMutation.isPending

    return { 
        isLoading, 
        deletaBuisnessMutation,
        deleteProductMutation,
        deletaServiceMutation,
        deleteAdminMutation,
        isOpen,
        setIsOpen
    }
}

export default useDeleteHook
