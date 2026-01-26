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
    const deletaProductMutation = useMutation({
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

    /** 🔹 Loading State */
    const isLoading =
        deletaBuisnessMutation.isPending || 
        deletaProductMutation.isPending || 
        deletaServiceMutation.isPending 

    return { 
        isLoading, 
        deletaBuisnessMutation,
        deletaProductMutation,
        deletaServiceMutation,
        isOpen,
        setIsOpen
    }
}

export default useDeleteHook
