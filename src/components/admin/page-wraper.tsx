"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";
import { MaxWidthWrapper } from "./max-with-wraper";

interface AdminPageWrapperProps {
    className?: string;
    children: ReactNode;
    breadcrumb?: {
        title: string,
        href?: string
    }[]
}

export function AdminPageWrapper({ className, breadcrumb, children }: AdminPageWrapperProps) {
    const { isMobile, open } = useSidebar();

    console.log({ isMobile, open });

    return (
        <div className="w-full flex flex-col h-svh">
            <header className="bg-background flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem key="default">
                            <BreadcrumbLink href="/admin">
                                Admin
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        {
                            breadcrumb && (
                                <BreadcrumbSeparator key="init-seperator" />
                            )
                        }
                        {
                            breadcrumb?.map((item, index) => (
                                <div key={index} className="flex items-center">
                                    {
                                        item.href ? (
                                            <>
                                                <BreadcrumbLink href={item.href}>
                                                    {item.title}
                                                </BreadcrumbLink>
                                            </>
                                        ) : (
                                            <BreadcrumbPage>
                                                {item.title}
                                            </BreadcrumbPage>
                                        )
                                    }
                                    {
                                        index !== breadcrumb.length - 1 && (
                                            <BreadcrumbSeparator />
                                        )
                                    }
                                </div>
                            ))
                        }
                    </BreadcrumbList>
                </Breadcrumb>
            </header>
            <ScrollArea className="grow">
                <main>
                    <MaxWidthWrapper className={cn(isMobile === undefined ? "w-full" : isMobile ? "w-screen" : open ? "w-[calc(100svw_-_16rem)]" : "w-[calc(100vw_-_3rem)]", className)}>
                        {children}
                    </MaxWidthWrapper>
                </main>
            </ScrollArea>
        </div>
    );
}
