'use client'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HeroUIProvider } from '@heroui/react';
import { ToastProvider } from "@heroui/toast";

const queryClient = new QueryClient();

function Provider({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <HeroUIProvider>
                <ToastProvider />
                {children}
                <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-right' client={queryClient} theme='light' />
            </HeroUIProvider>
        </QueryClientProvider>
    )
}

export default Provider