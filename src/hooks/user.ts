"use client";

import { useQuery } from "@tanstack/react-query";
import httpService from "@/helper/services/httpService"; 
import { AxiosError } from "axios"; 
import { userAtom } from "@/store/user";
import { useAtom } from "jotai";
import { IAdmin } from "@/helper/model/admin";

/** 🔹 Fetch user data using the userid from cookies */
async function fetchUser(): Promise<IAdmin | null> {

  const id =
  typeof window !== "undefined"
    ? localStorage.getItem("userid")
    : null; 
 

  if (!id) return null;

  try {
    const res = await httpService.get<{ data: IAdmin }>(`/admin-auth/${id}`); 

    console.log(res);
    

    return res.data.data;
  } catch (error) {


    console.log("error");

    const err = error as AxiosError<{ message?: string }>;

    console.log("error");
    
    console.log(error);
    
    // 🧹 Clear tokens and redirect on failure
    // Cookies.remove("userid");
    // Cookies.remove("accesstoken");
    localStorage.clear()
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }

    throw new Error(err.response?.data?.message || err.message);
  }
}

/**
 * ✅ useUser — TanStack Query hook replacement for userAtom
 * - Fetches user info with caching and automatic re-fetch
 * - Handles error + redirect logic
 */
export function useUserStore() {
  const id =
  typeof window !== "undefined"
    ? localStorage.getItem("userid")
    : null; 

  const [user] = useAtom(userAtom)
  return useQuery({
    queryKey: ["user", id],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes 
    enabled: user?._id ? false : true
  });
}
