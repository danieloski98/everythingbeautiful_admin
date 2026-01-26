"use client"
import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader } from "@heroui/react";
import { ReactNode } from "react";

interface IProps {
    isOpen: boolean;
    setIsOpen: (by: boolean) => void;
    children: ReactNode;
    footerchildren?: ReactNode;
    title?: string;
}

export default function DrawerLayout(
    {
        isOpen,
        setIsOpen,
        children,
        footerchildren,
        title
    }: IProps
) {
    return (
        <Drawer isOpen={isOpen} onOpenChange={setIsOpen}>
            <DrawerContent>
                <>
                    {title && (
                        <DrawerHeader className="flex flex-col gap-1 pb-3 border-b border-[#F5F5F5] ">{title}</DrawerHeader>
                    )}
                    <DrawerBody>
                        {children}
                    </DrawerBody>
                    <DrawerFooter   >
                        {footerchildren}
                    </DrawerFooter>
                </>
            </DrawerContent>
        </Drawer>
    )
}